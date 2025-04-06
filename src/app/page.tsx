import { getSession } from '@/helpers/session';
import { redirect } from 'next/navigation';
import { User } from '@/interfaces/User';

export default async function Home() {
	const user = await getSession() as User;
	console.log('HOME');
	if (!user) {
		console.log('INDO PRO LOGIN');
		redirect('/auth/customer/sign-in');
	}

	const isAdmin = user.key === 'ADMIN';
	if (isAdmin) {
		redirect('/admin/customers');
	}

	redirect('/customer/machine-panel');
}
