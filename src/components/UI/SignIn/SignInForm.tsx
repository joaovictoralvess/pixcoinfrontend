'use client';

import { useActionState, useState } from 'react';

import TextInput from '@/components/Forms/TextInput/TextInput';
import Button from '@/components/Forms/Button/Button';

import { handleSignInForm } from '@/components/UI/SignIn/actions';
import { initialState, resolvePasswordIcon } from '@/components/UI/SignIn/helpers';

export interface SignInFormProps {
	isAdmin?: boolean;
}

export default function SignInForm({ isAdmin = false }: SignInFormProps) {
	const [inputType, setInputType] = useState<'password' | 'text'>('password');

	const [state, formAction] = useActionState((handleSignInForm), initialState);

	return (
		<form action={formAction}>
			<div className='sign-in-container__left-section__wrapper-input'>
				<TextInput
					className='text-input-container'
					name='email'
					label='E-mail'
					placeholder='E-mail'
					inputMode='email'
					type='email'
					title='Seu e-mail'
					error={state.errors.email}
				/>

				<TextInput
					className='text-input-container'
					name='password'
					label='Senha'
					placeholder='Senha'
					type={inputType}
					icon={resolvePasswordIcon(inputType, setInputType)}
					title='Sua senha'
					error={state.errors.password}
				/>

				{isAdmin && (
					<TextInput
						name='admin'
						type='hidden'
						defaultValue='admin'
					/>
				)}
			</div>

			<Button type="submit" title='Entrar na sua conta'>Entrar</Button>
		</form>
	)
}