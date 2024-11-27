import { redirect } from 'next/navigation';

import Header from '@/app/customer/machine-panel/components/Header/Header';

import { getSession } from '@/helpers/session';

export default async function MachinePanel() {
	const user = await getSession();
	if (!user) {
		redirect('/auth/customer/sign-in');
	}

	return (
		<>
			<Header />
		</>
	)
}