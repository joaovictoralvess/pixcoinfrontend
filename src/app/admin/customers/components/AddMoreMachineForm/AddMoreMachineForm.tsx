import TextInput from '@/components/Forms/TextInput/TextInput';
import Button from '@/components/Forms/Button/Button';

import { useActionState, useState } from 'react';
import { handleCreateMachine } from '@/app/admin/customers/components/AddMoreMachineForm/actions';
import { initialState } from '@/app/admin/customers/components/AddMoreMachineForm/helpers';

export interface AddMoreMachineFormProps {
	clientId: string;
}

import './styles.scss';

export default function AddMoreMachineForm({ clientId }: AddMoreMachineFormProps) {
	const [state, formAction] = useActionState(handleCreateMachine, initialState);
	const [enableBonusPlay, setEnableBonusPlay] = useState(false);

	return (
		<form className='add-more-machine-form' action={formAction}>
			<TextInput
				name='name'
				label='Nome'
				placeholder='Nome'
				type='text'
				title='Nome da máquina'
				error={state.errors.name}
			/>

			<TextInput
				name='description'
				label='Descrição'
				placeholder='Descrição'
				title='Descrição'
				error={state.errors.description}
			/>

			<TextInput
				name='store_id'
				label='Store ID'
				placeholder='Store ID'
				title='Store ID'
				error={state.errors.store_id}
			/>

			<TextInput
				name='pulse_value'
				label='Valor do pulso'
				placeholder='Valor do pulso'
				title='Valor do pulso'
				error={state.errors.pulse_value}
				info="Valor do pulso em reais. Ex: se o valor do pulso for R$ 4, o cliente deve pagar R$ 4 para a entrada de 1 coin."
			/>

			<TextInput
				name='timeLow'
				label='Tempo low'
				placeholder='Tempo low'
				title='Tempo low'
				defaultValue={0}
				type='number'
				info="Tempo do noteiro baixo."
				min={0}
			/>

			<TextInput
				name='timeHigh'
				label='Tempo high'
				placeholder='Tempo high'
				title='Tempo high'
				defaultValue={0}
				type='number'
				info="Tempo do noteiro alto."
				min={0}
			/>

			<TextInput
				name='serial'
				label='Serial da máquina'
				placeholder='Serial da máquina'
				title='Serial da máquina'
			/>

			<div className="add-more-machine-form__wrapper-checkbox">
				<input
					type="checkbox"
					id="bonusPlay"
					name="bonusPlay"
					checked={enableBonusPlay}
					onChange={() => setEnableBonusPlay(!enableBonusPlay)}
				/>
				<label htmlFor="bonusPlay">Habilitar jogada bônus</label>
			</div>

			{enableBonusPlay && (
				<>
					<TextInput
						name='moves'
						label='Jogadas'
						placeholder='Jogadas'
						title='Jogadas'
						info="Defina quantas jogadas precisa ser feita para entrada do bônus"
						min={0}
						type="number"
					/>

					<TextInput
						name='bonus'
						label='Bônus'
						placeholder='Bônus'
						title='Bônus'
						info="Defina o valor do bônus (Quanto de coin entra de bônus após X jogadas)"
						min={0}
						type="number"
					/>
				</>
			)}

			<TextInput
				name='clienteId'
				defaultValue={clientId}
				type='hidden'
			/>

			<Button type="submit" title='Cadastrar máquina'>Cadastrar</Button>
		</form>
	)
}