import { NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/api";

/**
 * Proxies blog comments and likes straight to Django CMS backend database.
 */
export async function GET(request, { params }) {
  const { id } = await params;
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "";

  try {
    const res = await fetch(`${API_BASE_URL}/api/cms/blog/${id}/engagement/`, {
      headers: {
        Accept: "application/json",
        ...(ip ? { "X-Forwarded-For": ip } : {}),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { likes: 0, liked: false, comments: [], me: "Guest-ANON" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Failed to fetch blog engagement from Django:", err);
    return NextResponse.json(
      { likes: 0, liked: false, comments: [], me: "Guest-OFFLINE" },
      { status: 503 }
    );
  }
}

export async function POST(request, { params }) {
  const { id } = await params;
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "";

  try {
    const body = await request.json().catch(() => ({}));
    const res = await fetch(`${API_BASE_URL}/api/cms/blog/${id}/engagement/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(ip ? { "X-Forwarded-For": ip } : {}),
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Failed to post blog engagement to Django:", err);
    return NextResponse.json(
      { error: "Backend service unreachable." },
      { status: 503 }
    );
  }
}
