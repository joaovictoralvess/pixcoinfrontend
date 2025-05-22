'use client';

import { FormEvent, useActionState, useTransition } from 'react';

import Button from '@/components/Forms/Button/Button';
import TextInput from '@/components/Forms/TextInput/TextInput';
import Loading from '@/components/UI/Loading/Loading';

export interface RemoveMachineFormProps {
	customerId: string;
	cancelAction: () => void;
	isEmployee: boolean;
}

import { RemoveCustomer } from '@/app/admin/customers/components/RemoveCustomerForm/action';

import './style.scss';

export default function RemoveCustomerForm({
	customerId,
	cancelAction,
	isEmployee,
}: Readonly<RemoveMachineFormProps>) {
	const [isPending, startTransition] = useTransition();
	const [response, formActions] = useActionState(RemoveCustomer, {} as any);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		startTransition(() => {
			formActions(formData);
		});
	};

	return (
		<form
			className="remove-customer"
			action={formActions}
			onSubmit={handleSubmit}
		>
			{response && response.message && <p>{response.message}</p>}
			<div className="remove-customer__buttons">
				<Button onClick={cancelAction} type="button" title="Cancelar ação">
					Cancelar ação
				</Button>
				<Button type="submit" title="Excluir todos os pagamentos">
					Excluir
				</Button>

				<TextInput name="id" defaultValue={customerId} type="hidden" />

				<TextInput
					name="isEmployee"
					defaultValue={isEmployee ? '1' : '0'}
					type="hidden"
				/>
			</div>

			{isPending && <Loading />}
		</form>
	);
}
