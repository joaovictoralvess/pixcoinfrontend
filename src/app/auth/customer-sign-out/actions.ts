'use server';

import { redirect } from 'next/navigation';
import { logout } from "@/helpers/session";

export const customerSignOut = async () => {
    await logout();
    return redirect('/auth/customer/sign-in');
}