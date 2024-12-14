'use server';

import { getSession } from '@/helpers/session';
import { redirect } from 'next/navigation';

export const redirectAdminToLoginIfNotLogged = async () => {
	const user = await getSession();
	if (!user) {
		redirect('/auth/admin/sign-in');
	}
}