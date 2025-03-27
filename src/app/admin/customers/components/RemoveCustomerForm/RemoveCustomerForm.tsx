import { useActionState } from 'react';

import Button from '@/components/Forms/Button/Button';
import TextInput from '@/components/Forms/TextInput/TextInput';

export interface RemoveMachineFormProps {
	customerId: string;
	cancelAction: () => void;
	isEmployee: boolean
}

import { RemoveCustomer } from '@/app/admin/customers/components/RemoveCustomerForm/action';

import './style.scss';

export default function RemoveCustomerForm({ customerId, cancelAction, isEmployee }: RemoveMachineFormProps) {
	const [response, formActions] = useActionState(RemoveCustomer, {} as any);

	return (
		<form className='remove-customer' action={formActions}>
			{response && response.message && (<p>{response.message}</p>)}
			<div className='remove-customer__buttons'>
				<Button onClick={cancelAction} type='button' title='Cancelar ação'>Cancelar ação</Button>
				<Button type="submit" title='Excluir todos os pagamentos'>Excluir</Button>

				<TextInput
					name='id'
					defaultValue={customerId}
					type='hidden'
				/>

				<TextInput
					name='isEmployee'
					defaultValue={isEmployee ? '1' : '0'}
					type='hidden'
				/>
			</div>
		</form>
	)
}