'use client';

import { FormEvent, useActionState, useTransition } from 'react';

import Button from '@/components/Forms/Button/Button';
import TextInput from '@/components/Forms/TextInput/TextInput';
import Loading from '@/components/UI/Loading/Loading';

import { SendoCommandAction } from '@/app/customer/machine-panel/components/SendCommand/action';

export interface SendCommandFormProps {
	machineId: string;
	cancelAction: () => void;
	btnTitle: string;
	command: string;
	title: string;
}

import './styles.scss';

export default function SendCommandForm({ machineId, cancelAction, btnTitle, command, title }: Readonly<SendCommandFormProps>) {
	const [isPending, startTransition] = useTransition();
	const [state, formActions] = useActionState(SendoCommandAction, { status: '', message: '' });

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		startTransition(() => {
			formActions(formData);
		});
	};

	return (
		<form className='restart-machine-form' action={formActions} onSubmit={handleSubmit}>
			<div>
				<h2>{title}</h2>
				{state.status === 'error' && <p className="restart-machine-form__error">{state.message}</p>}
				{state.status === 'sucesso' && <p className="restart-machine-form__sucesso">{state.message} atualize a tela</p>}
			</div>

			<Button onClick={cancelAction} type='button' title='Cancelar ação'>Cancelar ação</Button>
			<Button type="submit" title='Excluir todos os pagamentos'>{btnTitle}</Button>

			<TextInput
				name='id'
				defaultValue={machineId}
				type='hidden'
			/>

			<TextInput
				name='command'
				defaultValue={command}
				type='hidden'
			/>

			{isPending && <Loading />}
		</form>
	);
}