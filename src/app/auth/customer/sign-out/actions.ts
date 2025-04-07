'use server';

import { redirect } from 'next/navigation';
import { getSession, logout } from '@/helpers/session';

import { User } from '@/interfaces/User';

export const signOut = async () => {
	const user = (await getSession()) as User;
	await logout();

	const redirectPath =
		user.key.toLowerCase() === 'admin' ? 'admin' : 'customer';
	return redirect(`/auth/${redirectPath}/sign-in`);
};
