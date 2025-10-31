import { NextResponse } from 'next/server';

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  // Handle OAuth errors
  if (error) {
    return NextResponse.redirect(
      new URL(`/profile?error=${error}`, request.url)
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL('/profile?error=no_code', request.url)
    );
  }

  try {
    // Exchange code for access token via backend
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const backendResponse = await fetch(`${API_URL}/linkedin/exchange`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, state }),
    });

    if (!backendResponse.ok) {
      throw new Error('Failed to exchange code');
    }

    const data = await backendResponse.json();

    // Redirect back to profile with success and profile data
    const profileData = encodeURIComponent(JSON.stringify(data.profile));
    return NextResponse.redirect(
      new URL(`/profile?success=true&data=${profileData}`, request.url)
    );
  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.redirect(
      new URL(`/profile?error=exchange_failed`, request.url)
    );
  }
}
