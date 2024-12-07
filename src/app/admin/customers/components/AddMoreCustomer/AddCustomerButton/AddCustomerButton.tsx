'use client';

import { useState } from 'react';

import Modal from '@/components/UI/Modal/Modal';
import ActionButton from '@/app/customer/machine-panel/components/ActionButton/ActionButton';

import './styles.scss';

export default function AddCustomerButton() {
	const [open, setOpen] = useState(false);

	return (
		<div className='customer-action-button-container'>
			<ActionButton callback={() => setOpen(!open)}>Criar novo cliente</ActionButton>

			{open && (
				<Modal onClose={() => setOpen(!open)} title='Criar novo cliente'>
					OI
				</Modal>
			)}
		</div>
	)
}