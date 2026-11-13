import { get, put, BlobPreconditionFailedError } from '@vercel/blob';
import { promises as fs } from 'fs';
import path from 'path';
import seedPosts from '@/app/data/channel.json';

// Blog data lives in Vercel Blob when BLOB_READ_WRITE_TOKEN is set (production),
// otherwise in local JSON files (local dev without a token).
const STORES = {
  posts: { blob: 'blog/posts.json', file: 'app/data/channel.json', seed: seedPosts },
  engagement: { blob: 'blog/engagement.json', file: 'app/data/blog-engagement.json', seed: {} },
};

const useBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);
const MAX_RETRIES = 5;

// --- Vercel Blob ---
async function readBlob(store) {
  // useCache: false reads from origin, so a save is visible on the very next request
  const res = await get(store.blob, { access: 'public', useCache: false });
  if (!res) return { data: structuredClone(store.seed), etag: null };
  return { data: await new Response(res.stream).json(), etag: res.blob.etag };
}

function writeBlob(store, data, etag) {
  return put(store.blob, JSON.stringify(data, null, 2), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    cacheControlMaxAge: 60,
    // existing blob: only overwrite the version we read; new blob: fail if someone created it meanwhile
    ...(etag ? { ifMatch: etag } : { allowOverwrite: false }),
  });
}

// --- Local files ---
async function readFile(store) {
  try {
    return { data: JSON.parse(await fs.readFile(path.join(process.cwd(), store.file), 'utf-8')) };
  } catch (err) {
    if (err.code === 'ENOENT') return { data: structuredClone(store.seed) };
    throw err;
  }
}

let fileQueue = Promise.resolve(); // serialises local read-modify-write cycles

export async function readJson(name) {
  const store = STORES[name];
  return (useBlob() ? await readBlob(store) : await readFile(store)).data;
}

// fn(data) either mutates data, returns replacement data, or returns false to skip the write.
// Resolves to the saved data, or null when skipped.
const apply = (fn, data) => {
  const out = fn(data);
  return out === false ? null : out === undefined ? data : out;
};

export async function updateJson(name, fn) {
  const store = STORES[name];

  if (!useBlob()) {
    const run = fileQueue.then(async () => {
      const next = apply(fn, (await readFile(store)).data);
      if (next) await fs.writeFile(path.join(process.cwd(), store.file), JSON.stringify(next, null, 2) + '\n');
      return next;
    });
    fileQueue = run.catch(() => {});
    return run;
  }

  for (let attempt = 1; ; attempt++) {
    const { data, etag } = await readBlob(store);
    const next = apply(fn, data);
    if (!next) return null;
    try {
      await writeBlob(store, next, etag);
      return next;
    } catch (err) {
      // another request saved first: re-read and apply our change again
      const conflict = err instanceof BlobPreconditionFailedError || (!etag && /exist/i.test(err.message));
      if (!conflict || attempt >= MAX_RETRIES) throw err;
    }
  }
}
