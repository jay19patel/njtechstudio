import { NextResponse } from "next/server";
import { POST_FIELDS } from "../../../blog/post-schema";

const EXAMPLE = {
  title: "Getting Started with FastAPI",
  category: "Tutorial",
  date: "2026-11-13T10:00:00.000Z",
  image: "/web-development.jpg",
  link: "https://fastapi.tiangolo.com",
  linkText: "FastAPI Docs",
  content: [
    "FastAPI is a modern Python framework for building APIs. In this post we build one in **5 minutes**.",
    "",
    "## Install",
    "",
    "```bash",
    "pip install fastapi uvicorn",
    "```",
    "",
    "## Your first endpoint",
    "",
    "```python",
    "from fastapi import FastAPI",
    "",
    "app = FastAPI()",
    "",
    "@app.get(\"/\")",
    "def home():",
    "    return {\"message\": \"Hello World\"}",
    "```",
    "",
    "![The automatic Swagger docs](/web-development.jpg)",
    "",
    "## Watch the full tutorial",
    "",
    "https://www.youtube.com/watch?v=tiBeLLv5GJo",
    "",
    "> Tip: a YouTube or Shorts link on its own line becomes an embedded video.",
  ].join("\n"),
};

export async function GET(request) {
  const origin = new URL(request.url).origin;
  return NextResponse.json({
    endpoint: `${origin}/api/blog`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "<BLOG_API_KEY from the server .env>",
    },
    fields: POST_FIELDS,
    markdown: {
      "## Heading": "Section heading (### for sub-heading)",
      "**bold**": "Bold text",
      "`code`": "Inline code",
      "```python ... ```": "Code block with syntax highlighting and copy button",
      "![caption](/image.png)": "Image with caption",
      "[text](https://...)": "Link",
      "- item / 1. item": "Bullet / numbered list",
      "> quote": "Highlighted quote / tip",
      "| a | b |": "Table",
      "https://www.youtube.com/watch?v=ID": "YouTube video (on its own line)",
      "https://www.youtube.com/shorts/ID": "YouTube Short, vertical player (on its own line)",
    },
    example: EXAMPLE,
    responses: {
      201: { success: true, post: "{ ...created post with id }", url: `${origin}/blog/<id>` },
      400: { error: "Validation failed", details: ["title is required"] },
      401: { error: "Invalid or missing x-api-key header" },
      503: { error: "Blog API is disabled: BLOG_API_KEY is not set on the server" },
    },
    curl: `curl -X POST ${origin}/api/blog -H "Content-Type: application/json" -H "x-api-key: YOUR_KEY" -d '{"title":"Hello","content":"## Hi\\nMy first post"}'`,
  });
}
