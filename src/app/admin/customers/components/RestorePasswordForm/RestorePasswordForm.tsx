import { useActionState } from 'react';

import Button from '@/components/Forms/Button/Button';
import TextInput from '@/components/Forms/TextInput/TextInput';

export interface RestorePasswordProps {
	customerId: string;
	cancelAction: () => void;
}

import { RestorePassword } from '@/app/admin/customers/components/RestorePasswordForm/action';

import './style.scss';

export default function RestorePasswordForm({
	customerId,
	cancelAction,
}: Readonly<RestorePasswordProps>) {
	const [response, formActions] = useActionState(RestorePassword, {} as any);

	return (
		<form className="remove-customer" action={formActions}>
			{response && response.message && <p>{response.message}</p>}
			<div className="remove-customer__buttons">
				<Button onClick={cancelAction} type="button" title="Cancelar ação">
					Cancelar ação
				</Button>
				<Button type="submit" title="Restaurar a senha">
					Restaurar senha
				</Button>

				<TextInput name="id" defaultValue={customerId} type="hidden" />
			</div>
		</form>
	);
}