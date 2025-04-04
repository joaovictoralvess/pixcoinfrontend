'use server';

import { getSession } from '@/helpers/session';
import { redirect } from 'next/navigation';
import { User } from '@/interfaces/User';

export const redirectCustomerToLoginIfNotLogged = async () => {
	const user: User = await getSession();
	if (!user) {
		redirect('/auth/customer/sign-in');
	}

	return user;
}