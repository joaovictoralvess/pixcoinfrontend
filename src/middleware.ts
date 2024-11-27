import {NextRequest, NextResponse} from 'next/server';
import {updateSession} from '@/helpers/session';

export async function middleware(request: NextRequest) {
    const updatedSession = await updateSession();
    if (!updatedSession) return;

    const resp = NextResponse.next();
    resp.cookies.set(updatedSession);

    return resp;
}