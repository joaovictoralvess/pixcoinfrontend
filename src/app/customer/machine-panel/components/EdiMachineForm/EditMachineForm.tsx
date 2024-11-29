import { useActionState } from 'react';

import TextInput from '@/components/Forms/TextInput/TextInput';
import Button from '@/components/Forms/Button/Button';

import { handleEditMachine } from '@/app/customer/machine-panel/components/EdiMachineForm/actions';
import { initialState } from '@/app/customer/machine-panel/components/EdiMachineForm/helpers';

import { IMachine } from '@/interfaces/IMachine';

export interface EditMachineFormProps {
	machine: IMachine;
}

import './styles.scss';

export default function EditMachineForm({ machine }: EditMachineFormProps) {
	const [state, formAction] = useActionState(handleEditMachine, initialState);
	return (
		<form className='edit-machine-form' action={formAction}>
			<TextInput
				name='name'
				label='Nome'
				placeholder='Nome'
				type='text'
				title='Nome da máquina'
				error={state.errors.name}
				defaultValue={machine.nome}
			/>

			<TextInput
				name='description'
				label='Descrição'
				placeholder='Descrição'
				title='Descrição da máquina'
				error={state.errors.description}
				defaultValue={machine.descricao}
			/>

			<TextInput
				name='value'
				label='Valor do pulso'
				placeholder='Valor do pulso'
				title='Valor do pulso'
				error={state.errors.value}
				defaultValue={machine.pulso}
			/>

			<TextInput
				name='stock'
				label='Estoque'
				placeholder='Estoque'
				title='Estoque'
				error={state.errors.stock}
				defaultValue={machine.estoque || '0'}
			/>

			<Button type="submit" title='Editar máquina'>Editar máquina</Button>
		</form>
	)
}