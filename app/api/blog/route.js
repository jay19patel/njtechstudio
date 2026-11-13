import { NextResponse } from "next/server";
import crypto from "crypto";
import { addPost } from "../../blog/posts";
import { validatePost } from "../../blog/post-schema";

// Hash both sides so timingSafeEqual gets equal-length buffers
const digest = (v) => crypto.createHash("sha256").update(v).digest();

function hasValidKey(request) {
  const expected = process.env.BLOG_API_KEY;
  const given = request.headers.get("x-api-key") || "";
  return Boolean(expected) && crypto.timingSafeEqual(digest(given), digest(expected));
}

export async function POST(request) {
  if (!process.env.BLOG_API_KEY) {
    return NextResponse.json({ error: "Blog API is disabled: BLOG_API_KEY is not set on the server" }, { status: 503 });
  }
  if (!hasValidKey(request)) {
    return NextResponse.json({ error: "Invalid or missing x-api-key header" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Body must be valid JSON" }, { status: 400 });

  const { post, errors } = validatePost(body);
  if (errors) return NextResponse.json({ error: "Validation failed", details: errors }, { status: 400 });

  try {
    await addPost(post);
  } catch (err) {
    console.error("Blog API save error:", err);
    return NextResponse.json({ error: "Failed to save post" }, { status: 500 });
  }

  const origin = new URL(request.url).origin;
  return NextResponse.json({ success: true, post, url: `${origin}/blog/${post.id}` }, { status: 201 });
}
