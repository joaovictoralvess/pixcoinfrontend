'use client';

import { useActionState, useState } from 'react';

import Button from '@/components/Forms/Button/Button';
import TextInput from '@/components/Forms/TextInput/TextInput';

export interface AddWarningProps {
	customerId: string;
	cancelAction: () => void;
	savedWarning?: string;
}

import { AddWarningToClient } from '@/app/admin/customers/components/AddWarningForm/action';

import './style.scss';

export default function AddWarningForm({
	customerId,
	cancelAction,
	savedWarning
}: Readonly<AddWarningProps>) {
	const [_, formActions] = useActionState(AddWarningToClient, {} as any);
	const [message, setMessage] = useState(savedWarning ?? "");

	return (
		<form className="add-warning" action={formActions}>
			 <textarea
				 value={message}
				 onChange={(e) => setMessage(e.target.value)}
				 placeholder="Digite o tapume para o cliente..."
			 ></textarea>

			<div className="add-warning__buttons">
				<Button onClick={cancelAction} type="button" title="Cancelar ação">
					Cancelar ação
				</Button>
				<Button type="submit" title="Excluir todos os pagamentos">
					Adicionar/Remover aviso
				</Button>

				<TextInput name="id" defaultValue={customerId} type="hidden" />
				<TextInput name="message" defaultValue={message} type="hidden" />
			</div>
		</form>
	);
}