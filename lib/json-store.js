import { get, put, list, del } from '@vercel/blob';

// Blog data lives in Vercel Blob (needs BLOB_READ_WRITE_TOKEN, locally too: `vercel env pull .env`).
//
// Blob is not read-after-write consistent when a path is overwritten: get() kept returning the
// old content for 15-20s after a save. So every save writes a NEW immutable version
// (blog/posts/v000042.json) and readers pick the newest one via list(), which is always fresh.
// Two saves racing for the same version number: the second gets "already exists" and retries.
const STORES = {
  posts: { prefix: 'blog/posts/v', empty: [] },
  engagement: { prefix: 'blog/engagement/v', empty: {} },
};

const MAX_RETRIES = 5;
const KEEP_VERSIONS = 20; // older versions are deleted; the rest act as a backup history

const versionOf = (pathname, prefix) => Number(pathname.slice(prefix.length, -'.json'.length));
const pathFor = (prefix, version) => `${prefix}${String(version).padStart(6, '0')}.json`;

async function read(store) {
  const { blobs } = await list({ prefix: store.prefix });
  const versions = blobs.sort((a, b) => a.pathname.localeCompare(b.pathname));
  const latest = versions.at(-1);
  if (!latest) return { data: structuredClone(store.empty), version: 0, versions };

  const res = await get(latest.pathname, { access: 'public', useCache: false });
  // never fall back to "empty" here: saving that would wipe every post
  if (!res) throw new Error(`Blob ${latest.pathname} is listed but could not be read`);
  return { data: await new Response(res.stream).json(), version: versionOf(latest.pathname, store.prefix), versions };
}

export async function readJson(name) {
  return (await read(STORES[name])).data;
}

// fn(data) either mutates data, returns replacement data, or returns false to skip the write.
// Resolves to the saved data, or null when skipped.
export async function updateJson(name, fn) {
  const store = STORES[name];
  for (let attempt = 1; ; attempt++) {
    const { data, version, versions } = await read(store);
    const out = fn(data);
    if (out === false) return null;
    const next = out === undefined ? data : out;
    try {
      await put(pathFor(store.prefix, version + 1), JSON.stringify(next, null, 2), {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false,
        allowOverwrite: false, // the optimistic lock: fails if another save took this version
        cacheControlMaxAge: 31536000, // versions never change, so they can be cached forever
      });
    } catch (err) {
      // another request saved first: re-read and apply our change again
      if (!/already exists/i.test(err.message) || attempt >= MAX_RETRIES) throw err;
      continue;
    }
    const old = versions.slice(0, -(KEEP_VERSIONS - 1));
    if (old.length) await del(old.map((b) => b.url)).catch((err) => console.error('Blob cleanup failed:', err));
    return next;
  }
}
