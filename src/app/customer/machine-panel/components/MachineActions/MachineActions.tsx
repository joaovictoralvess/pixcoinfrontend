'use client';

import { useState } from 'react';

import Modal from '@/components/UI/Modal/Modal';
import EditIcon from '@/components/Icons/EditIcon';
import DollarIcon from '@/components/Icons/DollarIcon';
import TrashIcon from '@/components/Icons/TrashIcon';

import ActionButton from '@/app/customer/machine-panel/components/ActionButton/ActionButton';
import EditMachineForm from '@/app/customer/machine-panel/components/EdiMachineForm/EditMachineForm';
import AddRemoteCreditForm from '@/app/customer/machine-panel/components/AddRemoteCreditForm/AddRemoteCreditForm';
import RemoveAllPaymentsForm from '@/app/customer/machine-panel/components/RemoveAllPaymentsForm/RemoveAllPaymentsForm';
import RemoveMachineForm from '@/app/customer/machine-panel/components/RemoveMachineForm/RemoveMachineForm';

import { IMachine } from '@/interfaces/IMachine';

export interface MachineActionsProps {
	machine: IMachine;
	shouldRender?: 'all' | 'edit-only' | 'credit-only' | 'delete-only' | 'delete-machine';
	isAdmin?: boolean;
}

import './styles.scss';

export default function MachineActions({ machine, isAdmin, shouldRender = 'all' }: MachineActionsProps) {
	const [selectedModal, setSelectedModal] = useState<'edit' | 'credit' | 'destroy-payments' | 'delete-machine' | ''>('');

	const handleCloseModal = () => setSelectedModal('');

	const renderModalContent = () => {
		switch (selectedModal) {
			case 'edit':
				return <EditMachineForm machine={machine} />;
			case 'credit':
				return <AddRemoteCreditForm machineId={machine.id} />;
			case 'destroy-payments':
				return <RemoveAllPaymentsForm machineId={machine.id} cancelAction={handleCloseModal} />;
			case 'delete-machine':
				return <RemoveMachineForm machineId={machine.id} cancelAction={handleCloseModal} />
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
				return 'Excluir todos os pagamentos';
			case 'delete-machine':
				return `Excluir máquina ${machine.nome}`;
			default:
				return '';
		}
	}

	const render = () => {
		if (shouldRender === 'all') {
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

					{isAdmin && (
						<ActionButton
							className='machine-action-buttons--delete'
							callback={() => setSelectedModal('delete-machine')}
							icon={<TrashIcon width={10} height={10} />}
						>
							Excluir máquina
						</ActionButton>
					)}

					{selectedModal && (
						<Modal onClose={handleCloseModal} title={resolveModalTitle()}>
							{renderModalContent()}
						</Modal>
					)}
				</div>
			)
		}

		if (shouldRender === 'delete-only') {
			return (
				<div className='machine-action-buttons'>
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
			)
		}
	}

	return render();
}
