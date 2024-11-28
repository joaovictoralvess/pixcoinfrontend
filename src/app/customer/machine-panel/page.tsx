import { redirect } from 'next/navigation';

import Header from '@/app/customer/machine-panel/components/Header/Header';
import Machine from '@/app/customer/machine-panel/components/Machine/Machine';
import PageTitleWithSync from '@/app/customer/machine-panel/components/PageTitleWithSync/PageTitleWithSync';
import Layout from '@/app/customer/machine-panel/components/Layout/Layout';

import { getSession } from '@/helpers/session';

import MachineService from '@/services/Machine';

import './styles.scss';

export default async function MachinePanel() {
	const user = await getSession();
	if (!user) {
		redirect('/auth/customer/sign-in');
	}

	const machines = await MachineService.all();

	return (
		<>
			<Header />
			<main className='machine-panel'>
				<Layout className='machine-panel__container'>
					<PageTitleWithSync updateTo='/customer/machine-panel' title='Painel de máquinas' />
					{machines && machines.length && machines.map((machine) => (
						<div key={`${machine.id}`} className='machine-panel__container__wrapper-machines'>
							<Machine machine={machine} />
						</div>
					))}
				</Layout>
			</main>
		</>
	)
}