import { get, put, BlobPreconditionFailedError } from '@vercel/blob';

// Blog data lives in Vercel Blob (needs BLOB_READ_WRITE_TOKEN, locally too: `vercel env pull .env`)
const STORES = {
  posts: { blob: 'blog/posts.json', empty: [] },
  engagement: { blob: 'blog/engagement.json', empty: {} },
};

const MAX_RETRIES = 5;

async function read(store) {
  // useCache: false reads from origin, so a save is visible on the very next request
  const res = await get(store.blob, { access: 'public', useCache: false });
  if (!res) return { data: structuredClone(store.empty), etag: null };
  // get() returns a weak ETag (W/"..."), but put({ ifMatch }) only accepts the strong form
  return { data: await new Response(res.stream).json(), etag: res.blob.etag.replace(/^W\//, '') };
}

function write(store, data, etag) {
  return put(store.blob, JSON.stringify(data, null, 2), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    cacheControlMaxAge: 60,
    // existing blob: only overwrite the version we read; new blob: fail if someone created it meanwhile
    ...(etag ? { ifMatch: etag } : { allowOverwrite: false }),
  });
}

export async function readJson(name) {
  return (await read(STORES[name])).data;
}

// fn(data) either mutates data, returns replacement data, or returns false to skip the write.
// Resolves to the saved data, or null when skipped.
export async function updateJson(name, fn) {
  const store = STORES[name];
  for (let attempt = 1; ; attempt++) {
    const { data, etag } = await read(store);
    const out = fn(data);
    if (out === false) return null;
    const next = out === undefined ? data : out;
    try {
      await write(store, next, etag);
      return next;
    } catch (err) {
      // another request saved first: re-read and apply our change again
      const conflict = err instanceof BlobPreconditionFailedError || (!etag && /exist/i.test(err.message));
      if (!conflict || attempt >= MAX_RETRIES) throw err;
    }
  }
}
