import { getSession } from '@/helpers/session';
import { redirect } from 'next/navigation';

export default async function Home() {
	const user = await getSession();
	if (!user) {
		redirect('/auth/customer/sign-in');
	}

	return null;
}
