import { NextRequest, NextResponse } from 'next/server';
import { signBotinoToken } from '@/lib/botino-auth';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const userId = typeof body.user_id === 'string' ? body.user_id : 'demo-user-001';
  const name = typeof body.name === 'string' ? body.name : undefined;
  const email = typeof body.email === 'string' ? body.email : undefined;

  try {
    const token = signBotinoToken({ user_id: userId, name, email });
    return NextResponse.json({ token });
  } catch {
    return NextResponse.json(
      { error: 'BOTINO_IDENTITY_SECRET is not configured on the server' },
      { status: 500 }
    );
  }
}
