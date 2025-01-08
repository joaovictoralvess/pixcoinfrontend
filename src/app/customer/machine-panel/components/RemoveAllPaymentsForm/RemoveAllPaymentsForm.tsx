import { useActionState } from 'react';

import TextInput from '@/components/Forms/TextInput/TextInput';
import Button from '@/components/Forms/Button/Button';

import { RemoveAllPayments } from '@/app/customer/machine-panel/components/RemoveAllPaymentsForm/actions';

export interface RemoveAllPaymentsFormProps {
	machineId: string;
	cancelAction: () => void;
}

import './styles.scss';

export default function RemoveAllPaymentsForm({ machineId, cancelAction }: RemoveAllPaymentsFormProps) {
	const [_, formActions] = useActionState(RemoveAllPayments, {} as any);

	return (
		<form className='remove-all-payments-form' action={formActions}>
			<Button onClick={cancelAction} type='button' title='Cancelar ação'>Cancelar ação</Button>
			<Button type="submit" title='Excluir todos os pagamentos'>Excluir pagamentos</Button>

			<TextInput
				name='id'
				defaultValue={machineId}
				type='hidden'
			/>
		</form>
	)
}