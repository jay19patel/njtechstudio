import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { verifyRequest } from '@/lib/auth';

const SUBMISSIONS_PATH = path.join(process.cwd(), 'app', 'data', 'submissions.json');

export async function GET(request) {
  try {
    // 1. Verify admin session
    const isAuthenticated = verifyRequest(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized: Admin session required' },
        { status: 401 }
      );
    }

    // 2. Read submissions
    try {
      const dataStr = await fs.readFile(SUBMISSIONS_PATH, 'utf-8');
      const submissions = JSON.parse(dataStr);
      
      // Sort submissions: newest first (assuming items have createdAt)
      submissions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      return NextResponse.json(submissions);
    } catch (err) {
      if (err.code === 'ENOENT') {
        return NextResponse.json([]);
      }
      throw err;
    }
  } catch (error) {
    console.error('Submissions GET error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve submissions', details: error.message },
      { status: 500 }
    );
  }
}
