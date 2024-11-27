import Link from 'next/link';

import { IMachine } from '@/interfaces/IMachine';

import './styles.scss';

export interface IMachineProps {
	machine: IMachine;
}

export default function Machine({
	machine: {
		status,
		nome,
		descricao,
		id
	}
}: IMachineProps) {
	return (
		<Link className='machine' href={`/customer/machine-panel/${id}`}>
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
				<p className="machine__body__description">{descricao}</p>
			</div>
		</Link>
	);
}