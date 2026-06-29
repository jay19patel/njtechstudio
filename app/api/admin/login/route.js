import { NextResponse } from 'next/server';
import { signToken } from '@/lib/auth';

const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || 'njtech_admin_secret_key_2026';

export async function POST(request) {
  try {
    const { secretKey } = await request.json();
    
    if (!secretKey) {
      return NextResponse.json(
        { success: false, error: 'Secret Key is required' },
        { status: 400 }
      );
    }
    
    if (secretKey !== ADMIN_SECRET_KEY) {
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
