'use client';

import { useState } from 'react';

import DatePickerRange from '@/components/Forms/DatePicker/DatePicker';
import ActionButton from '@/app/customer/machine-panel/components/ActionButton/ActionButton';

export interface PaymentReportProps {
	machineId: string;
}

import './styles.scss';

export default function PaymentReport({ machineId }: PaymentReportProps) {
	const [startDate, setStartDate] = useState<string>('');
	const [endDate, setEndDate] = useState<string>('');

	return (
		<div className='payment-report'>
			<DatePickerRange
				onSelectStartDate={(e) => setStartDate(new Date(e.target.value).toISOString())}
				onSelectEndDate={(e) => setEndDate(new Date(e.target.value).toISOString())}
			/>

			<ActionButton updateTo={`/customer/payment-report/${machineId}?startDate=${startDate}&endDate=${endDate}`} disabled={!(startDate && endDate)}>Relatório</ActionButton>
		</div>
	);
}