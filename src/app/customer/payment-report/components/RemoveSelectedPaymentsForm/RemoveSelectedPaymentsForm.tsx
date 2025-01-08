import { useActionState } from 'react';

import Button from '@/components/Forms/Button/Button';
import TextInput from '@/components/Forms/TextInput/TextInput';

export interface RemoveSelectedPaymentsFormProps {
	startDate: string;
	endDate: string;
	machineId: string;
	cancelAction: () => void;
}

import { RemoveSelectedPayments } from '@/app/customer/payment-report/components/RemoveSelectedPaymentsForm/actions';

import './styles.scss';

export default function RemoveSelectedPaymentsForm({ machineId, endDate, startDate, cancelAction }: RemoveSelectedPaymentsFormProps) {
	const [_, formActions] = useActionState(RemoveSelectedPayments, {} as any);

	const newDateStartDate = new Date(startDate);
	const newEndDate = new Date(endDate);

	return (
		<form className='remove-selected-payments' action={formActions}>
			<div className='remove-selected-payments__warnings'>
				<span>
					Pagamentos de {`${newDateStartDate.getUTCDate()}/${newDateStartDate.getMonth()}/${newDateStartDate.getFullYear()}`} até {`${newEndDate.getUTCDate()}/${newEndDate.getMonth()}/${newEndDate.getFullYear()}`}
				</span>

				{_ && _.message && (
					<p>{_.message}</p>
				)}
			</div>
			<div className='remove-selected-payments__actions'>
				<Button onClick={cancelAction} type='button' title='Cancelar ação'>Cancelar ação</Button>
				<Button type="submit" title='Excluir todos os pagamentos'>Excluir pagamentos</Button>

				<TextInput
					name='id'
					defaultValue={machineId}
					type='hidden'
				/>

				<TextInput
					name='startDate'
					defaultValue={startDate}
					type='hidden'
				/>

				<TextInput
					name='endDate'
					defaultValue={endDate}
					type='hidden'
				/>
			</div>
		</form>
	);
}