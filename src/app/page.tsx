import { getSession } from '@/helpers/session';
import { redirect } from 'next/navigation';
import { User } from '@/interfaces/User';

export default async function Home() {
	console.log('HOME');
	const user = await getSession() as User;
	if (!user) {
		redirect('/auth/customer/sign-in');
	}

	const isAdmin = user.key === 'ADMIN';
	if (isAdmin) {
		redirect('/admin/customers');
	}

	redirect('/customer/machine-panel');
}
