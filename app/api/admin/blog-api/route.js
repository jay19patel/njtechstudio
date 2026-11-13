import { NextResponse } from 'next/server';
import { verifyRequest } from '@/lib/auth';

// Lets the logged-in admin see the blog API key to build curl commands
export async function GET(request) {
  if (!verifyRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized: Admin session required' }, { status: 401 });
  }
  return NextResponse.json({ key: process.env.BLOG_API_KEY || null });
}
