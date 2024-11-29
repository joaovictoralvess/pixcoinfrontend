import Link from 'next/link';

import { IMachine } from '@/interfaces/IMachine';

import { formatToBRL } from '@/helpers/payment';

import MachineActions from '@/app/customer/machine-panel/components/MachineActions/MachineActions';

import './styles.scss';

export interface IMachineProps {
	machine: IMachine;
}

export default function Machine({
	machine
}: IMachineProps) {
	const  {
		status,
		nome,
		id,
		store_id,
		pulso,
		totalComEstorno,
		totalEspecie,
		totalSemEstorno
	} = machine;

	return (
		<div className='machine'>
			<Link href={`/customer/machine-panel/${id}`}>
				<div className='machine__header'>
					{status === 'OFFLINE' ? (
						<>
							<span className="machine__header__icon machine__header__icon--offline">✖</span>
							<span className="machine__header__text machine__header__text--offline">{status}</span>
						</>
					) : (
						<>
							<span className="machine__header__icon">✔</span>
							<span className="machine__header__text">{status}</span>
						</>
					)}
				</div>

				<div className="machine__body">
					<h2 className="machine__body__title">{nome}</h2>
					<p className="machine__body__description">Total: {formatToBRL(`${totalSemEstorno}`)}</p>
					<p className="machine__body__description">Estornos: {formatToBRL(`${totalComEstorno}`)}</p>
					<p className="machine__body__description">Espécie: {formatToBRL(`${totalEspecie}`)}</p>
					<p className="machine__body__description">Pulso: {formatToBRL(pulso)}</p>
					<p className="machine__body__description">StoreId: {store_id}</p>
				</div>
			</Link>

			<MachineActions machine={machine} />
		</div>
	);
}