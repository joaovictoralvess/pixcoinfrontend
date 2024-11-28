import Link from 'next/link';

import { IMachine } from '@/interfaces/IMachine';

import DollarIcon from '@/components/Icons/DollarIcon';
import EditIcon from '@/components/Icons/EditIcon';
import ActionButton from '@/app/customer/machine-panel/components/ActionButton/ActionButton';

import { formatToBRL } from '@/helpers/payment';

import './styles.scss';

export interface IMachineProps {
	machine: IMachine;
}

export default function Machine({
	machine: {
		status,
		nome,
		id,
		store_id,
		pulso,
		totalComEstorno,
		totalEspecie,
		totalSemEstorno
	}
}: IMachineProps) {
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

			<div className='machine__action-buttons'>
				<ActionButton
					updateTo='/'
					icon={<EditIcon width={10} height={10} />}
				>
					Editar máquina
				</ActionButton>

				<ActionButton
					updateTo='/'
					icon={<DollarIcon width={10} height={10} />}
				>
					Crédito remoto
				</ActionButton>
			</div>
		</div>
	);
}