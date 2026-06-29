import { NextResponse } from 'next/server';
import { verifyRequest } from '@/lib/auth';

export async function GET(request) {
  const isAuthenticated = verifyRequest(request);
  
  return NextResponse.json({
    success: true,
    authenticated: isAuthenticated
  });
}
