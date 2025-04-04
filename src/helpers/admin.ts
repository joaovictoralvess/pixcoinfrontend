'use server';

import { getSession } from '@/helpers/session';
import { redirect } from 'next/navigation';
import { User } from '@/interfaces/User';

export const redirectAdminToLoginIfNotLogged = async () => {
	const user: User = await getSession();
	if (!user) {
		redirect('/auth/admin/sign-in');
	}

	return user;
}