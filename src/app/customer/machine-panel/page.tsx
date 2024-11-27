import Image from 'next/image';
import { redirect } from 'next/navigation';

import Header from '@/app/customer/machine-panel/components/Header/Header';
import Machine from '@/app/customer/machine-panel/components/Machine/Machine';

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
				<div className='machine-panel__container'>
					<h1 className='machine-panel__container__title'>Painel de máquinas</h1>
					<button className='machine-panel__container__btn'>
						<Image
							src='/assets/images/sync.svg'
							alt='Ícone de seta simbolizando login'
							width={10}
							height={10}
						/>
						Atualizar
					</button>

					{machines && machines.length && machines.map((machine) => (
						<div key={`${machine.id}`} className='machine-panel__container__wrapper-machines'>
							<Machine machine={machine} />
						</div>
					))}
				</div>
			</main>
		</>
	)
}