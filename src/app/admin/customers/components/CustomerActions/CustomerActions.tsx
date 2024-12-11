'use client';

import { useState } from 'react';

import { ICustomer } from '@/interfaces/ICustomer';

import Modal from '@/components/UI/Modal/Modal';
import ActionButton from '@/app/customer/machine-panel/components/ActionButton/ActionButton';

import AddMoreCustomerForm from '@/app/admin/customers/components/AddMoreCustomerForm/AddMoreCustomerForm';
import AddMoreMachineForm from '@/app/admin/customers/components/AddMoreMachineForm/AddMoreMachineForm';
import EditCustomerForm from '@/app/admin/customers/components/EditCustomerForm/EditCustomerForm';

export interface CustomerActionsProps {
	shouldRender?: 'all' | 'new-customer' | 'new-machine' | 'edit-customer-and-add-machine',
	clientId?: string;
	customer?: ICustomer;
}

import './styles.scss';

export default function CustomerActions({ customer, shouldRender = 'all', clientId = '' }: CustomerActionsProps) {
	const [selectedModal, setSelectedModal] = useState<'new-customer' | 'new-machine' | 'edit-customer' | ''>('');

	const handleCloseModal = () => setSelectedModal('');

	const renderModalContent = () => {
		switch (selectedModal) {
			case 'new-customer':
				return <AddMoreCustomerForm />;
			case 'new-machine':
				return <AddMoreMachineForm clientId={clientId}  />;
			case 'edit-customer':
				return <EditCustomerForm customer={customer!} />
			default:
				return null;
		}
	};

	const resolveModalTitle = () => {
		switch (selectedModal) {
			case 'new-customer':
				return `Criar novo cliente`;
			case 'new-machine':
				return 'Nova máquina'
			case 'edit-customer':
				return 'Editar cliente'
			default:
				return '';
		}
	}

	const render = () => {
		if (shouldRender === 'all') {
			return (
				<div className='customer-action-button-container'>
					<ActionButton callback={() => setSelectedModal('new-customer')}>Criar novo cliente</ActionButton>

					<ActionButton callback={() => setSelectedModal('new-machine')}>Adicionar máquina</ActionButton>

					<ActionButton callback={() => setSelectedModal('edit-customer')}>Editar cliente</ActionButton>

					{selectedModal && (
						<Modal onClose={handleCloseModal} title={resolveModalTitle()}>
							{renderModalContent()}
						</Modal>
					)}
				</div>
			)
		}

		if (shouldRender === 'new-machine') {
			return (
				<div className='customer-action-button-container'>
					<ActionButton callback={() => setSelectedModal('new-machine')}>Adicionar máquina</ActionButton>

					{selectedModal && (
						<Modal onClose={handleCloseModal} title={resolveModalTitle()}>
							{renderModalContent()}
						</Modal>
					)}
				</div>
			)
		}

		if (shouldRender === 'new-customer') {
			return (
				<div className='customer-action-button-container'>
					<ActionButton callback={() => setSelectedModal('new-customer')}>Criar novo cliente</ActionButton>

					{selectedModal && (
						<Modal onClose={handleCloseModal} title={resolveModalTitle()}>
							{renderModalContent()}
						</Modal>
					)}
				</div>
			)
		}

		if (shouldRender === 'edit-customer-and-add-machine') {
			return (
				<div className='customer-action-button-container'>
					<ActionButton callback={() => setSelectedModal('new-machine')}>Adicionar máquina</ActionButton>

					<ActionButton callback={() => setSelectedModal('edit-customer')}>Editar cliente</ActionButton>

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