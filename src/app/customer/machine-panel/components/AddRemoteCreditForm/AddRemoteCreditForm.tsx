import { useActionState } from 'react';

import TextInput from '@/components/Forms/TextInput/TextInput';
import Button from '@/components/Forms/Button/Button';

import { handleAddMachineCredit } from '@/app/customer/machine-panel/components/AddRemoteCreditForm/actions';

import { initialState } from '@/app/customer/machine-panel/components/AddRemoteCreditForm/helpers';

import './styles.scss';

export interface AddRemoteCreditForm {
	machineId: string;
}

export default function AddRemoteCreditForm({ machineId }: AddRemoteCreditForm) {
	const [state, formActions] = useActionState(handleAddMachineCredit, initialState);
	return (
		<form action={formActions} className='add-remote-credit-form'>
			<TextInput
				name='value'
				label='Valor do crédito'
				placeholder='Valor do crédito'
				title='Valor do crédito'
				error={state.errors.value}
			/>

			<TextInput
				name='id'
				defaultValue={machineId}
				type='hidden'
			/>

			<Button type="submit" title='Adicionar crédito'>Adicionar crédito</Button>
		</form>
	);
}