import Header from '@/components/UI/Header/Header';
import Layout from '@/components/UI/Layout/Layout';
import Machine from '@/app/customer/machine-panel/components/Machine/Machine';
import PageTitleWithSync from '@/app/customer/machine-panel/components/PageTitleWithSync/PageTitleWithSync';

import { redirectCustomerToLoginIfNotLogged } from '@/helpers/customer';

import MachineService from '@/services/Machine';

import './styles.scss';

export default async function MachinePanel() {
	await redirectCustomerToLoginIfNotLogged()

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