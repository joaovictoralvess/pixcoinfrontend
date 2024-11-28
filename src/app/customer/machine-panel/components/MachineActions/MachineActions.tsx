'use client';

import ActionButton from '@/app/customer/machine-panel/components/ActionButton/ActionButton';
import EditIcon from '@/components/Icons/EditIcon';
import DollarIcon from '@/components/Icons/DollarIcon';

import './styles.scss';

export default function MachineActions() {
	return (
		<div className='machine-action-buttons'>
			<ActionButton
				icon={<EditIcon width={10} height={10} />}
			>
				Editar máquina
			</ActionButton>

			<ActionButton
				icon={<DollarIcon width={10} height={10} />}
			>
				Crédito remoto
			</ActionButton>
		</div>
	)
};