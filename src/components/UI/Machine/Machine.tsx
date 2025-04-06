'use client';

import { ReactNode, useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { IMachine } from '@/interfaces/IMachine';
import { User } from '@/interfaces/User';

import { formatToBRL } from '@/helpers/payment';
import { statusMap } from '@/helpers/machine';

import MachineActions from '@/app/customer/machine-panel/components/MachineActions/MachineActions';

import Loading from '@/components/UI/Loading/Loading';

export interface IMachineProps {
	machine: IMachine;
	customerId?: string;
	user: User;
}

import './styles.scss';

export default function Machine({
	machine,
	customerId,
	user,
}: Readonly<IMachineProps>) {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const handleCardClick = () => {
		startTransition(() => {
			router.push(
				isAdmin
					? `/admin/customers/${customerId}/machine/${id}?machineName=${machine.nome}`
					: `/customer/machine-panel/${id}?machineName=${machine.nome}`
			);
		});
	};

	const isAdmin = user.key === 'ADMIN';

	const {
		status,
		nome,
		id,
		store_id,
		pulso,
		totalComEstorno,
		totalEspecie,
		totalSemEstorno,
		tempoLow,
		tempoHigh,
		estoque,
	} = machine;

	const resolveMachineStatus = (): ReactNode => {
		if (statusMap[status] === 'OFFLINE') {
			return (
				<>
					<span className="machine__header__icon machine__header__icon--offline">
						✖
					</span>
					<span className="machine__header__text machine__header__text--offline">
						{statusMap[status]}
					</span>
				</>
			);
		}

		if (statusMap[status] === 'PAGAMENTO RECENTE') {
			return (
				<>
					<span className="machine__header__icon machine__header__icon--recent">
						✔
					</span>
					<span className="machine__header__text machine__header__text--recent">
						{statusMap[status]}
					</span>
				</>
			);
		}

		return (
			<>
				<span className="machine__header__icon">✔</span>
				<span className="machine__header__text">{statusMap[status]}</span>
			</>
		);
	};

	return (
		<div className="machine">
			<div onClick={handleCardClick}>
				<div className="machine__header">{resolveMachineStatus()}</div>

				<div className="machine__body">
					<h2 className="machine__body__title">{nome}</h2>
					<p className="machine__body__description">
						Total: {formatToBRL(`${totalSemEstorno}`)}
					</p>
					<p className="machine__body__description">
						Estornos: {formatToBRL(`${totalComEstorno}`)}
					</p>
					<p className="machine__body__description">
						Espécie: {formatToBRL(`${totalEspecie}`)}
					</p>
					<p className="machine__body__description">Estoque: {estoque}</p>
					<p className="machine__body__description">Pulso: {pulso}</p>
					<p className="machine__body__description">Tempo Low: {tempoLow}s</p>
					<p className="machine__body__description">Tempo High: {tempoHigh}s</p>
					<p className="machine__body__description">StoreId: {store_id}</p>
				</div>
			</div>

			<MachineActions
				user={user}
				customerId={customerId}
				isAdmin={isAdmin}
				machine={machine}
			/>

			{isPending && <Loading useInRoot />}
		</div>
	);
}
