import { useActionState, useState } from 'react';

import TextInput from '@/components/Forms/TextInput/TextInput';
import Button from '@/components/Forms/Button/Button';

import { handleEditMachine } from '@/app/customer/machine-panel/components/EdiMachineForm/actions';
import { initialState } from '@/app/customer/machine-panel/components/EdiMachineForm/helpers';

import { IMachine } from '@/interfaces/IMachine';

export interface EditMachineFormProps {
	machine: IMachine;
	customerId?: string;
}

import './styles.scss';

export default function EditMachineForm({
	machine,
	customerId,
}: Readonly<EditMachineFormProps>) {
	const [state, formAction] = useActionState(handleEditMachine, initialState);
	const [enableBonusPlay, setEnableBonusPlay] = useState(
		machine.bonusPlay || false
	);

	const [enableTabledBonus, setEnableTabledBonus] = useState(
		machine.tabledBonus || false
	);

	return (
		<form className="edit-machine-form" action={formAction}>
			<TextInput
				name="name"
				label="Nome"
				placeholder="Nome"
				type="text"
				title="Nome da máquina"
				error={state.errors.name}
				defaultValue={machine.nome}
			/>

			<TextInput
				name="description"
				label="Descrição"
				placeholder="Descrição"
				title="Descrição da máquina"
				error={state.errors.description}
				defaultValue={machine.descricao}
			/>

			<TextInput
				name="value"
				label="Valor do pulso"
				placeholder="Valor do pulso"
				title="Valor do pulso"
				error={state.errors.value}
				defaultValue={machine.pulso}
				info="Valor do pulso em reais. Ex: se o valor do pulso for R$ 4, o cliente deve pagar R$ 4 para a entrada de 1 coin."
			/>

			<TextInput
				name="timeLow"
				label="Tempo low"
				placeholder="Tempo low"
				title="Tempo low"
				defaultValue={machine.tempoLow || 0}
				type="number"
				info="Tempo do noteiro baixo."
				min={0}
			/>

			<TextInput
				name="timeHigh"
				label="Tempo high"
				placeholder="Tempo high"
				title="Tempo high"
				defaultValue={machine.tempoHigh || 0}
				type="number"
				info="Tempo do noteiro alto."
				min={0}
			/>

			<TextInput
				name="serial"
				label="Serial da máquina"
				placeholder="Serial da máquina"
				title="Serial da máquina"
				defaultValue={machine.maquininha_serial || ''}
			/>

			<TextInput
				name="stock"
				label="Estoque"
				placeholder="Estoque"
				title="Estoque"
				error={state.errors.stock}
				defaultValue={machine.estoque || '0'}
			/>

			<div className="edit-machine-form__wrapper-checkbox">
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
						name="moves"
						label="Jogadas"
						placeholder="Jogadas"
						title="Jogadas"
						defaultValue={machine.moves || '0'}
						info="Defina quantas jogadas precisa ser feita para entrada do bônus"
						min={0}
						type="number"
					/>

					<TextInput
						name="bonus"
						label="Bônus"
						placeholder="Bônus"
						title="Bônus"
						defaultValue={machine.bonus || '0'}
						info="Defina o valor do bônus (Quanto de coin entra de bônus após X jogadas)"
						min={0}
						type="number"
					/>
				</>
			)}

			<div className="add-more-machine-form__wrapper-checkbox">
				<input
					type="checkbox"
					id="tabledBonus"
					name="tabledBonus"
					checked={enableTabledBonus}
					onChange={() => setEnableTabledBonus(!enableTabledBonus)}
				/>
				<label htmlFor="tabledBonus">Habilitar bônus tabelado</label>
			</div>

			{enableTabledBonus && (
				<>
					<TextInput
						name="five"
						label="Bônus a cada R$ 5,00"
						placeholder="Bônus a cada R$ 5,00"
						title="Bônus a cada R$ 5,00"
						info="A cada todo pagamento de R$ 5,00 vai entrar X de crédito definido neste campo"
						min={0}
						type="number"
						defaultValue={machine.bonus_five || 0}
					/>

					<TextInput
						name="ten"
						label="Bônus a cada R$ 10,00"
						placeholder="Bônus a cada R$ 10,00"
						title="Bônus a cada R$ 10,00"
						info="A cada todo pagamento de R$ 10,00 vai entrar X de crédito definido neste campo."
						min={0}
						type="number"
						defaultValue={machine.bonus_ten || 0}
					/>

					<TextInput
						name="twenty"
						label="Bônus a cada R$ 20,00"
						placeholder="Bônus a cada R$ 20,00"
						title="Bônus a cada R$ 20,00"
						info="A cada todo pagamento de R$ 20,00 vai entrar X de crédito definido neste campo."
						min={0}
						type="number"
						defaultValue={machine.bonus_twenty || 0}
					/>

					<TextInput
						name="fifity"
						label="Bônus a cada R$ 50,00"
						placeholder="Bônus a cada R$ 50,00"
						title="Bônus a cada R$ 50,00"
						info="A cada todo pagamento de R$ 50,00 vai entrar X de crédito definido neste campo."
						min={0}
						type="number"
						defaultValue={machine.bonus_fifty || 0}
					/>

					<TextInput
						name="hundred"
						label="Bônus a cada R$ 100,00"
						placeholder="Bônus a cada R$ 100,00"
						title="Bônus a cada R$ 100,00"
						info="A cada todo pagamento de R$ 100,00 vai entrar X de crédito definido neste campo."
						min={0}
						type="number"
						defaultValue={machine.bonus_hundred || 0}
					/>
				</>
			)}

			<TextInput
				name="storeId"
				defaultValue={machine.store_id || '0'}
				type="hidden"
			/>

			<TextInput name="id" defaultValue={machine.id || '0'} type="hidden" />

			<TextInput
				name="customerId"
				defaultValue={customerId || '0'}
				type="hidden"
			/>

			<Button type="submit" title="Editar máquina">
				Salvar
			</Button>
		</form>
	);
}
