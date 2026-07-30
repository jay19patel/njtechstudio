import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { signToken } from '@/lib/auth';

const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY;

// Simple in-memory sliding-window rate limit. Resets on server restart and is
// per-instance only — acceptable for this single-instance deployment, not a
// substitute for a shared store if this ever scales to multiple instances.
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX_ATTEMPTS = 10;
const attemptsByIp = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const attempts = (attemptsByIp.get(ip) || []).filter((t) => now - t < LOGIN_WINDOW_MS);
  attempts.push(now);
  attemptsByIp.set(ip, attempts);
  return attempts.length > LOGIN_MAX_ATTEMPTS;
}

function timingSafeStringEqual(a, b) {
  const aBuf = Buffer.from(String(a));
  const bBuf = Buffer.from(String(b));
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

export async function POST(request) {
  try {
    if (!ADMIN_SECRET_KEY) {
      console.error('ADMIN_SECRET_KEY is not configured');
      return NextResponse.json(
        { success: false, error: 'Server misconfiguration' },
        { status: 500 }
      );
    }

    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many attempts. Try again later.' },
        { status: 429 }
      );
    }

    const { secretKey } = await request.json();

    if (!secretKey) {
      return NextResponse.json(
        { success: false, error: 'Secret Key is required' },
        { status: 400 }
      );
    }

    if (!timingSafeStringEqual(secretKey, ADMIN_SECRET_KEY)) {
      return NextResponse.json(
        { success: false, error: 'Invalid Secret Key' },
        { status: 401 }
      );
    }

    // Key is valid, generate signed session token (valid for 24 hours)
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
    const token = signToken({ authenticated: true, expiresAt });

    const response = NextResponse.json({ success: true, message: 'Authentication successful' });

    // Set secure cookie
    response.headers.set(
      'Set-Cookie',
      `admin_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${24 * 60 * 60}${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
    );

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'An internal error occurred' },
      { status: 500 }
    );
  }
}
