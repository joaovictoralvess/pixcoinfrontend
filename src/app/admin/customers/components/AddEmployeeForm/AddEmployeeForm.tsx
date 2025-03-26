import { useActionState } from 'react';

import TextInput from '@/components/Forms/TextInput/TextInput';
import Button from '@/components/Forms/Button/Button';

import { initialState } from '@/app/admin/customers/components/AddEmployeeForm/helpers';

import { handleCreateEmployee } from '@/app/admin/customers/components/AddEmployeeForm/actions';

import './styles.scss';

export default function AddEmployeeForm({ id }: { id: string }) {
	const [state, formAction] = useActionState(handleCreateEmployee, initialState);

	return (
		<form className='add-employee-form' action={formAction}>
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

			<div className="add-employee-form__wrapper-checkbox">
				<input
					type="checkbox"
					id="canDelete"
					name="canDelete"
				/>
				<label htmlFor="canDelete">Pode deletar pagamentos</label>
			</div>

			<div className="add-employee-form__wrapper-checkbox">
				<input
					type="checkbox"
					id="canAddCredit"
					name="canAddCredit"
				/>
				<label htmlFor="canAddCredit">Pode adicionar crédito remoto</label>
			</div>

			<div className="add-employee-form__wrapper-checkbox">
				<input
					type="checkbox"
					id="canEditMachine"
					name="canEditMachine"
				/>
				<label htmlFor="canEditMachine">Pode editar as máquinas</label>
			</div>

			<TextInput
				name='id'
				defaultValue={id}
				type='hidden'
			/>

			<Button type="submit" title='Cadastrar cliente'>Criar Funcionário</Button>
		</form>
	)
}