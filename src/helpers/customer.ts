'use server';

import { getSession } from '@/helpers/session';
import { redirect } from 'next/navigation';

export const redirectCustomerToLoginIfNotLogged = async () => {
	const user = await getSession();
	if (!user) {
		redirect('/auth/customer/sign-in');
	}
}