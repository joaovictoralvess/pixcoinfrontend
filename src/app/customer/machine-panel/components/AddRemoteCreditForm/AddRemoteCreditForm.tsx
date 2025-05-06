'use client';

import { FormEvent, useActionState, useTransition } from 'react';

import TextInput from '@/components/Forms/TextInput/TextInput';
import Button from '@/components/Forms/Button/Button';
import Loading from '@/components/UI/Loading/Loading';

import { handleAddMachineCredit } from '@/app/customer/machine-panel/components/AddRemoteCreditForm/actions';

import { initialState } from '@/app/customer/machine-panel/components/AddRemoteCreditForm/helpers';

import './styles.scss';

export interface AddRemoteCreditForm {
	machineId: string;
}

export default function AddRemoteCreditForm({ machineId }: Readonly<AddRemoteCreditForm>) {
	const [isPending, startTransition] = useTransition();
	const [state, formActions] = useActionState(
		handleAddMachineCredit,
		initialState
	);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		startTransition(() => {
			formActions(formData);
		});
	};

	return (
		<form action={formActions} onSubmit={handleSubmit} className="add-remote-credit-form">
			<TextInput
				name="value"
				label="Valor do crédito"
				placeholder="Valor do crédito"
				title="Valor do crédito"
				error={state.errors.value}
			/>

			<TextInput name="id" defaultValue={machineId} type="hidden" />

			<Button type="submit" title="Adicionar crédito">
				{isPending ? 'Enviando...' : 'Adicionar Crédito'}
			</Button>

			{isPending && <Loading />}
		</form>
	);
}