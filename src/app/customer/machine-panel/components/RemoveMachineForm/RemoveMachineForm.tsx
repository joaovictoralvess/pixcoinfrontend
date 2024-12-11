import { useActionState } from 'react';

import Button from '@/components/Forms/Button/Button';
import TextInput from '@/components/Forms/TextInput/TextInput';

import { RemoveMachine } from '@/app/customer/machine-panel/components/RemoveMachineForm/action';

export interface RemoveMachineFormProps {
	machineId: string;
	cancelAction: () => void;
}

import './style.scss';

export default function RemoveMachineForm({ machineId, cancelAction }: RemoveMachineFormProps) {
	const [_, formActions] = useActionState(RemoveMachine, {} as any);

	return (
		<form className='remove-machine-form' action={formActions}>
			<Button onClick={cancelAction} type='button' title='Cancelar ação'>Cancelar ação</Button>
			<Button type="submit" title='Excluir todos os pagamentos'>Excluir Máquina</Button>

			<TextInput
				name='id'
				defaultValue={machineId}
				type='hidden'
			/>
		</form>
	)
}