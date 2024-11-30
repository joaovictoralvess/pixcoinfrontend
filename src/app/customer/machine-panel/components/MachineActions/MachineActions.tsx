'use client';

import { useState } from 'react';

import EditIcon from '@/components/Icons/EditIcon';
import Modal from '@/components/UI/Modal/Modal';
import DollarIcon from '@/components/Icons/DollarIcon';
import ActionButton from '@/app/customer/machine-panel/components/ActionButton/ActionButton';
import EditMachineForm from '@/app/customer/machine-panel/components/EdiMachineForm/EditMachineForm';
import AddRemoteCreditForm from '@/app/customer/machine-panel/components/AddRemoteCreditForm/AddRemoteCreditForm';

import { IMachine } from '@/interfaces/IMachine';

export interface MachineActionsProps {
	machine: IMachine;
}

import './styles.scss';
import TrashIcon from '@/components/Icons/TrashIcon';

export default function MachineActions({ machine }: MachineActionsProps) {
	const [selectedModal, setSelectedModal] = useState<'edit' | 'credit' | 'destroy-payments' | ''>('');

	const handleCloseModal = () => setSelectedModal('');

	const renderModalContent = () => {
		switch (selectedModal) {
			case 'edit':
				return <EditMachineForm machine={machine} />;
			case 'credit':
				return <AddRemoteCreditForm machineId={machine.id} />;
			default:
				return null;
		}
	};

	const resolveModalTitle = () => {
		switch (selectedModal) {
			case 'edit':
				return `Editar ${machine.nome}`;
			case 'credit':
				return `Créditos em ${machine.nome}`;
			case 'destroy-payments':
				return 'Excluir todos os pagamentos'
			default:
				return '';
		}
	}

	return (
		<div className='machine-action-buttons'>
			<ActionButton
				callback={() => setSelectedModal('edit')}
				icon={<EditIcon width={10} height={10} />}
			>
				Editar máquina
			</ActionButton>

			<ActionButton
				callback={() => setSelectedModal('credit')}
				icon={<DollarIcon width={10} height={10} />}
			>
				Crédito remoto
			</ActionButton>

			<ActionButton
				className='machine-action-buttons--delete'
				callback={() => setSelectedModal('destroy-payments')}
				icon={<TrashIcon width={10} height={10} />}
			>
				Excluir pagamentos
			</ActionButton>

			{selectedModal && (
				<Modal onClose={handleCloseModal} title={resolveModalTitle()}>
					{renderModalContent()}
				</Modal>
			)}
		</div>
	);
}
