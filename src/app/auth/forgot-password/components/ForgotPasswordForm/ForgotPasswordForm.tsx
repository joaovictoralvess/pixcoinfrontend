'use client';

import { FormEvent, useActionState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

import TextInput from '@/components/Forms/TextInput/TextInput';
import Button from '@/components/Forms/Button/Button';
import Loading from '@/components/UI/Loading/Loading';
import { handleSendForgotPasswordForm } from '@/app/auth/forgot-password/components/ForgotPasswordForm/action';

export default function ForgotPasswordForm() {
	const router = useRouter();

	const [isPending, startTransition] = useTransition();
	const [state, formAction] = useActionState(handleSendForgotPasswordForm, {
		errors: {
			password: undefined,
			email: undefined,
		},
		isValid: undefined,
		success: undefined,
	});

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		startTransition(() => {
			formAction(formData);
		});
	};

	return (
		<form action={formAction} onSubmit={handleSubmit}>
			<div className="forgot-password-container__left-section__wrapper-input">
				<TextInput
					className="text-input-container"
					name="email"
					label="E-mail"
					placeholder="E-mail"
					inputMode="email"
					type="email"
					title="Seu e-mail"
					error={state.errors.email}
					info={state.success}
					disabled={isPending}
				/>

				<button
					type="button"
					className="forgot-password-container__left-section__wrapper-input__link"
					onClick={() => router.back()}
				>
					Voltar à página anterior
				</button>
			</div>

			<Button type="submit" title="Entrar na sua conta">
				{isPending ? 'Enviando...' : 'Enviar-email de recuperação'}
			</Button>

			{isPending && <Loading />}
		</form>
	);
}
