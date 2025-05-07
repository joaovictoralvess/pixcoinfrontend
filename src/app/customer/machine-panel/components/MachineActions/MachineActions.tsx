'use client';

import { useState } from 'react';

import Modal from '@/components/UI/Modal/Modal';
import EditIcon from '@/components/Icons/EditIcon';
import DollarIcon from '@/components/Icons/DollarIcon';
import TrashIcon from '@/components/Icons/TrashIcon';
import ResetNetworkIcon from '@/components/Icons/ResetIcon';

import ActionButton from '@/app/customer/machine-panel/components/ActionButton/ActionButton';
import EditMachineForm from '@/app/customer/machine-panel/components/EdiMachineForm/EditMachineForm';
import AddRemoteCreditForm from '@/app/customer/machine-panel/components/AddRemoteCreditForm/AddRemoteCreditForm';
import RemoveAllPaymentsForm from '@/app/customer/machine-panel/components/RemoveAllPaymentsForm/RemoveAllPaymentsForm';
import RemoveMachineForm from '@/app/customer/machine-panel/components/RemoveMachineForm/RemoveMachineForm';
import SendCommandForm from '@/app/customer/machine-panel/components/SendCommand/SendCommandForm';

import { IMachine } from '@/interfaces/IMachine';
import { User } from '@/interfaces/User';

export interface MachineActionsProps {
	machine: IMachine;
	shouldRender?: 'all' | 'edit-only' | 'credit-only' | 'delete-only' | 'delete-machine';
	isAdmin?: boolean;
	customerId?: string;
	user: User,
}

import './styles.scss';

export default function MachineActions({ machine, isAdmin, customerId, user, shouldRender = 'all' }: MachineActionsProps) {
	const [selectedModal, setSelectedModal] = useState<'edit' | 'credit' | 'destroy-payments' | 'delete-machine' | 'restart-machine' | ''>('');

	const handleCloseModal = () => setSelectedModal('');

	const renderModalContent = () => {
		switch (selectedModal) {
			case 'edit':
				return <EditMachineForm customerId={!user.employee ? customerId : user.parent_id} machine={machine} />;
			case 'credit':
				return <AddRemoteCreditForm machineId={machine.id} />;
			case 'destroy-payments':
				return <RemoveAllPaymentsForm machineId={machine.id} cancelAction={handleCloseModal} />;
			case 'delete-machine':
				return <RemoveMachineForm machineId={machine.id} cancelAction={handleCloseModal} />
			case 'restart-machine':
				return <SendCommandForm title="Esta ação irá reiniciar sua máquina controladora" command="restart" btnTitle="Reiniciar" machineId={machine.id} cancelAction={handleCloseModal} />
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
			case 'restart-machine':
				return 'Reiniciar Máquina'
			default:
				return '';
		}
	}

	const render = () => {
		if (shouldRender === 'all') {

			if (user.employee) {
				return (
					<div className='machine-action-buttons'>
						{user.canEditMachine && (
							<ActionButton
								callback={() => setSelectedModal('edit')}
								icon={<EditIcon width={10} height={10} />}
							>
								Editar máquina
							</ActionButton>
						)}

						{user.canAddRemoteCredit && (
							<ActionButton
								callback={() => setSelectedModal('credit')}
								icon={<DollarIcon width={10} height={10} />}
							>
								Crédito remoto
							</ActionButton>
						)}

						{user.canDeletePayments && (
							<ActionButton
								className='machine-action-buttons--delete'
								callback={() => setSelectedModal('destroy-payments')}
								icon={<TrashIcon width={10} height={10} />}
							>
								Excluir pagamentos
							</ActionButton>
						)}

						{selectedModal && (
							<Modal onClose={handleCloseModal} title={resolveModalTitle()}>
								{renderModalContent()}
							</Modal>
						)}
					</div>
				);
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
						callback={() => setSelectedModal('restart-machine')}
						icon={<ResetNetworkIcon width={15} />}
					>
						Reiniciar Máquina
					</ActionButton>

					<ActionButton
						callback={() => setSelectedModal('destroy-payments')}
						icon={<ResetNetworkIcon width={15} />}
					>
						Reset de WI-FI
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
			if (user.employee) {
				return (
					<div className='machine-action-buttons'>
						{user.canDeletePayments && (
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
						)}
					</div>
				)
			}
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
