import { NextResponse } from "next/server";
import crypto from "crypto";
import { getPosts } from "../../../blog/posts";
import { readJson, updateJson } from "@/lib/json-store";

const MAX_COMMENT = 1000;
const COMMENT_COOLDOWN_MS = 15_000;

// Same IP -> same id. Only the salted hash is stored, never the raw IP.
function visitorFrom(request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const hash = crypto
    .createHash("sha256")
    .update(`${process.env.ADMIN_SECRET_KEY || "njtechstudio"}:${ip}`)
    .digest("hex");
  return { hash, name: `Guest-${hash.slice(0, 6).toUpperCase()}` };
}

const view = (entry, visitor) => ({
  likes: entry.likes.length,
  liked: entry.likes.includes(visitor.hash),
  comments: entry.comments.map(({ id, author, text, date }) => ({ id, author, text, date })),
  me: visitor.name,
});

const emptyEntry = () => ({ likes: [], comments: [] });

export async function GET(request, { params }) {
  const { id } = await params;
  const store = await readJson("engagement");
  return NextResponse.json(view(store[id] || emptyEntry(), visitorFrom(request)));
}

export async function POST(request, { params }) {
  const { id } = await params;
  const posts = await getPosts();
  if (!posts.some((p) => p.id === id)) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const visitor = visitorFrom(request);
  const body = await request.json().catch(() => ({}));

  if (body.action === "like") {
    const store = await updateJson("engagement", (store) => {
      const e = (store[id] ||= emptyEntry());
      e.likes = e.likes.includes(visitor.hash)
        ? e.likes.filter((h) => h !== visitor.hash)
        : [...e.likes, visitor.hash];
    });
    return NextResponse.json(view(store[id], visitor));
  }

  if (body.action === "comment") {
    const text = typeof body.text === "string" ? body.text.trim() : "";
    if (!text || text.length > MAX_COMMENT) {
      return NextResponse.json({ error: `Comment must be 1-${MAX_COMMENT} characters` }, { status: 400 });
    }
    const store = await updateJson("engagement", (store) => {
      const e = (store[id] ||= emptyEntry());
      const last = e.comments.findLast((c) => c.authorHash === visitor.hash);
      if (last && Date.now() - new Date(last.date).getTime() < COMMENT_COOLDOWN_MS) return false;
      e.comments.push({
        id: crypto.randomUUID(),
        author: visitor.name,
        authorHash: visitor.hash,
        text,
        date: new Date().toISOString(),
      });
    });
    if (!store) {
      return NextResponse.json({ error: "Please wait a few seconds before commenting again" }, { status: 429 });
    }
    return NextResponse.json(view(store[id], visitor));
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
