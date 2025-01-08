import { useActionState } from 'react';

import Button from '@/components/Forms/Button/Button';
import TextInput from '@/components/Forms/TextInput/TextInput';

import { DisableMachines } from '@/app/admin/customers/components/DisableMachinesForm/action';

export interface RemoveMachineFormProps {
	customerId: string;
	cancelAction: () => void;
}

import './style.scss';

export default function DisableMachinesForm({ customerId, cancelAction }: RemoveMachineFormProps) {
	const [response, formActions] = useActionState(DisableMachines, {} as any);

	return (
		<form className='disable-machines' action={formActions}>
			{response && response.message && (<p>{response.message}</p>)}
			<div className='disable-machines__buttons'>
				<Button onClick={cancelAction} type='button' title='Cancelar ação'>Cancelar ação</Button>
				<Button type="submit" title='Excluir todos os pagamentos'>Ativar/Desativar máquinas</Button>

				<TextInput
					name='id'
					defaultValue={customerId}
					type='hidden'
				/>
			</div>
		</form>
	)
}