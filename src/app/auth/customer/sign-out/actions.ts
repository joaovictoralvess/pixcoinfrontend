'use server';

import { redirect } from 'next/navigation';
import { logout } from '@/helpers/session';

export const signOut = async () => {
    await logout();
    return redirect('/auth/customer/sign-in');
}