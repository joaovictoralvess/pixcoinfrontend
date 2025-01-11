import { useActionState } from 'react';

import Button from '@/components/Forms/Button/Button';
import TextInput from '@/components/Forms/TextInput/TextInput';

export interface RemoveMachineFormProps {
	customerId: string;
	cancelAction: () => void;
}

import { RemoveCustomer } from '@/app/admin/customers/components/RemoveCustomerForm/action';

import './style.scss';

export default function RemoveCustomerForm({ customerId, cancelAction }: RemoveMachineFormProps) {
	const [response, formActions] = useActionState(RemoveCustomer, {} as any);

	return (
		<form className='disable-machines' action={formActions}>
			{response && response.message && (<p>{response.message}</p>)}
			<div className='disable-machines__buttons'>
				<Button onClick={cancelAction} type='button' title='Cancelar ação'>Cancelar ação</Button>
				<Button type="submit" title='Excluir todos os pagamentos'>Excluir Cliente</Button>

				<TextInput
					name='id'
					defaultValue={customerId}
					type='hidden'
				/>
			</div>
		</form>
	)
}