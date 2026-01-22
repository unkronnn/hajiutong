import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('session_token')?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { user: null, authenticated: false },
        { status: 401 }
      );
    }

    // Find session
    const session = await db.session.findUnique({
      where: { token: sessionToken },
      include: {
        user: true,
      },
    });

    if (!session) {
      return NextResponse.json(
        { user: null, authenticated: false },
        { status: 401 }
      );
    }

    // Check if session is expired
    if (session.expiresAt < new Date()) {
      await db.session.delete({
        where: { token: sessionToken },
      });
      return NextResponse.json(
        { user: null, authenticated: false },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: {
        id: session.user.id,
        email: session.user.email,
        username: session.user.username,
        name: session.user.name,
        role: session.user.role,
        emailVerified: session.user.emailVerified,
      },
      authenticated: true,
    });
  } catch (error) {
    console.error('Session error:', error);
    return NextResponse.json(
      { user: null, authenticated: false },
      { status: 500 }
    );
  }
}
