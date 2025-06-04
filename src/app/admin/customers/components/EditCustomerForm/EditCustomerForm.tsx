'use client';

import { FormEvent, useActionState, useTransition } from 'react';

import { ICustomer } from '@/interfaces/ICustomer';

import TextInput from '@/components/Forms/TextInput/TextInput';
import Button from '@/components/Forms/Button/Button';

import { handleEditCustomer } from '@/app/admin/customers/components/EditCustomerForm/actions';
import { initialState } from '@/app/admin/customers/components/EditCustomerForm/helpers';

export interface EditCustomerFormProps {
	customer: ICustomer;
}

import './styles.scss';

export default function EditCustomerForm({ customer }: Readonly<EditCustomerFormProps>) {
	const [isPending, startTransition] = useTransition();

	const [state, formAction] = useActionState(handleEditCustomer, initialState);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		startTransition(() => {
			formAction(formData);
		});
	};

	if (isPending) {
		return (
			<h1>Atualizando cliente...</h1>
		)
	}

	return (
		<form className="edit-customer" action={formAction} onSubmit={handleSubmit}>
			<TextInput
				name="name"
				label="Nome"
				placeholder="Nome"
				type="text"
				title="Nome do cliente"
				defaultValue={customer.nome}
				error={state.errors.name}
			/>

			<TextInput
				name="cellphone"
				label="Telefone"
				placeholder="Telefone"
				type="text"
				title="Telefone do cliente"
				defaultValue={customer.cellphone}
				error={state.errors.name}
			/>

			<TextInput
				name="token"
				label="Token"
				placeholder="Token"
				title="Token do cliente"
				defaultValue={customer.mercadoPagoToken}
			/>

			<TextInput
				name="pagbank_token"
				label="Pagbank Token"
				placeholder="Pagbank Token"
				title="Token do pagbank"
				defaultValue={customer.pagbankToken ?? ''}
			/>

			<TextInput
				name="pagbank_email"
				label="Pagbank E-mail"
				placeholder="Pagbank E-mail"
				title="E-mail do pagbank"
				defaultValue={customer.pagbankEmail ?? ''}
			/>

			<TextInput
				name="maturity"
				label="Vencimento"
				placeholder="Vencimento"
				title="Data de vencimento"
				type="date"
				defaultValue={customer.dataVencimento}
				error={state.errors.maturity}
			/>

			<TextInput name="id" defaultValue={customer.id} type="hidden" />

			<Button type="submit" title="Atualizar cliente">
				Atualizar
			</Button>
		</form>
	);
}