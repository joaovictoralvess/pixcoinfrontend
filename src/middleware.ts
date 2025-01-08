import { NextRequest, NextResponse } from 'next/server';
import { getSession, isTokenExpired, logout, updateSession } from '@/helpers/session';
import { User } from '@/interfaces/User';

export async function middleware(request: NextRequest) {
    const updatedSession = await updateSession();
    if (!updatedSession) return;

    await redirectToLoginIfInvalidToken(NextResponse, request);

    const resp = NextResponse.next();
    resp.cookies.set(updatedSession);

    return resp;
}

const redirectToLoginIfInvalidToken = async (NextResponse: any, request: NextRequest) => {
    const user = await getSession() as Pick<User, 'token'>;

    if (user.token && isTokenExpired(user.token)) {
        await logout();
    }
}