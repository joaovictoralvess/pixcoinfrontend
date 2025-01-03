import { useActionState } from 'react';

import TextInput from '@/components/Forms/TextInput/TextInput';
import Button from '@/components/Forms/Button/Button';

import { handeCreateMoreCustomer } from '@/app/admin/customers/components/AddMoreCustomerForm/actions';
import { initialState } from '@/app/admin/customers/components/AddMoreCustomerForm/helpers';

import './styles.scss';

export default function AddMoreCustomerForm() {
	const [state, formAction] = useActionState(handeCreateMoreCustomer, initialState);

	return (
		<form className='add-more-customer-form' action={formAction}>
			<TextInput
				name='name'
				label='Nome'
				placeholder='Nome'
				type='text'
				title='Nome do cliente'
				error={state.errors.name}
			/>

			<TextInput
				name='email'
				label='E-mail'
				placeholder='E-mail'
				title='E-mail do cliente'
				error={state.errors.email}
			/>

			<TextInput
				name='password'
				label='Senha'
				placeholder='Senha'
				title='Senha do cliente'
				error={state.errors.password}
			/>

			<TextInput
				name='token'
				label='Token'
				placeholder='Token'
				title='Token do cliente'
			/>

			<TextInput
				name='pagbank_token'
				label='Pagbank Token'
				placeholder='Pagbank Token'
				title='Token do pagbank'
			/>

			<TextInput
				name='pagbank_email'
				label='Pagbank E-mail'
				placeholder='Pagbank E-mail'
				title='E-mail do pagbank'
			/>

			<TextInput
				name='maturity'
				label='Vencimento'
				placeholder='Vencimento'
				title='Data de vencimento'
				type='date'
				error={state.errors.maturity}
			/>

			<Button type="submit" title='Cadastrar cliente'>Cadastrar</Button>
		</form>
	)
}