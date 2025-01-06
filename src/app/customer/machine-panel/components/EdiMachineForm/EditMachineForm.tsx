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
				name='timeLow'
				label='Tempo low'
				placeholder='Tempo low'
				title='Tempo low'
				defaultValue={machine.tempoLow || 0}
				type='number'
			/>

			<TextInput
				name='timeHigh'
				label='Tempo high'
				placeholder='Tempo high'
				title='Tempo high'
				defaultValue={machine.tempoHigh || 0}
				type='number'
			/>

			<TextInput
				name='serial'
				label='Serial da máquina'
				placeholder='Serial da máquina'
				title='Serial da máquina'
				defaultValue={machine.maquininha_serial || ''}
			/>

			<TextInput
				name='stock'
				label='Estoque'
				placeholder='Estoque'
				title='Estoque'
				error={state.errors.stock}
				defaultValue={machine.estoque || '0'}
			/>

			<TextInput
				name='storeId'
				defaultValue={machine.store_id || '0'}
				type='hidden'
			/>

			<TextInput
				name='id'
				defaultValue={machine.id || '0'}
				type='hidden'
			/>

			<Button type="submit" title='Editar máquina'>Editar máquina</Button>
		</form>
	)
}