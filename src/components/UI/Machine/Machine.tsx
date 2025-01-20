import { ReactNode } from 'react';
import Link from 'next/link';

import { IMachine } from '@/interfaces/IMachine';
import { User } from '@/interfaces/User';

import { formatToBRL } from '@/helpers/payment';
import { getSession } from '@/helpers/session';
import { statusMap } from '@/helpers/machine';

import MachineActions from '@/app/customer/machine-panel/components/MachineActions/MachineActions';

export interface IMachineProps {
	machine: IMachine;
	customerId?: string;
}

import './styles.scss';

export default async function Machine({
	machine,
	customerId
}: IMachineProps) {
	const user = await getSession() as User;
	const isAdmin = user.key === 'ADMIN';

	const  {
		status,
		nome,
		id,
		store_id,
		pulso,
		totalComEstorno,
		totalEspecie,
		totalSemEstorno,
		tempoLow,
		tempoHigh
	} = machine;

	const resolveMachineStatus = (): ReactNode => {
		if (statusMap[status] === 'OFFLINE') {
			return (
				<>
					<span className="machine__header__icon machine__header__icon--offline">✖</span>
					<span className="machine__header__text machine__header__text--offline">{statusMap[status]}</span>
				</>
			)
		}

		if (statusMap[status] === 'PAGAMENTO RECENTE') {
			return (
				<>
					<span className="machine__header__icon machine__header__icon--recent">✔</span>
					<span className="machine__header__text machine__header__text--recent">{statusMap[status]}</span>
				</>
			);
		}

		return (
			<>
				<span className="machine__header__icon">✔</span>
				<span className="machine__header__text">{statusMap[status]}</span>
			</>
		)
	}

	return (
		<div className='machine'>
			<Link href={isAdmin ? `/admin/customers/${customerId}/machine/${id}?machineName=${machine.nome}` : `/customer/machine-panel/${id}?machineName=${machine.nome}`}>
				<div className='machine__header'>
					{resolveMachineStatus()}
				</div>

				<div className="machine__body">
					<h2 className="machine__body__title">{nome}</h2>
					<p className="machine__body__description">Total: {formatToBRL(`${totalSemEstorno}`)}</p>
					<p className="machine__body__description">Estornos: {formatToBRL(`${totalComEstorno}`)}</p>
					<p className="machine__body__description">Espécie: {formatToBRL(`${totalEspecie}`)}</p>
					<p className="machine__body__description">Pulso: {pulso}</p>
					<p className="machine__body__description">Tempo Low: {tempoLow}s</p>
					<p className="machine__body__description">Tempo High: {tempoHigh}s</p>
					<p className="machine__body__description">StoreId: {store_id}</p>
				</div>
			</Link>

			<MachineActions customerId={customerId} isAdmin={isAdmin} machine={machine} />
		</div>
	);
}