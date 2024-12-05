'use client';

import { useState } from 'react';

import DatePickerRange from '@/components/Forms/DatePicker/DatePicker';
import ActionButton from '@/app/customer/machine-panel/components/ActionButton/ActionButton';

import { DownloadReportRequest } from '@/interfaces/Report';
import { downloadReport } from '@/components/UI/PaymentReport/download';

export interface PaymentReportProps {
	machineId: string;
}

import './styles.scss';

export default function PaymentReport({ machineId }: PaymentReportProps) {
	const [startDate, setStartDate] = useState<string>('');
	const [endDate, setEndDate] = useState<string>('');

	const newEndDate = new Date(`${endDate}`);
	newEndDate.setUTCHours(23, 59, 0, 0);

	const downloadData: DownloadReportRequest = {
		startDate,
		endDate,
		machineId
	}

	const handleDownloadReport = async () => {
		const newEndDate = new Date(endDate);
		newEndDate.setUTCHours(23, 59, 0, 0);
		downloadData.endDate = newEndDate.toISOString();

		const blob = await downloadReport(downloadData);
		if (blob) {
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = "relatorio.pdf";
			document.body.appendChild(a);
			a.click();
			a.remove();
			window.URL.revokeObjectURL(url);
		}
	}

	return (
		<div className='payment-report'>
			<DatePickerRange
				onSelectStartDate={(e) => setStartDate(new Date(e.target.value).toISOString())}
				onSelectEndDate={(e) => setEndDate(new Date(e.target.value).toISOString())}
			/>

			<ActionButton updateTo={`/customer/machine-panel/${machineId}?startDate=${startDate}&endDate=${endDate}`} disabled={!(startDate && endDate)}>Filtrar</ActionButton>
			<ActionButton updateTo={`/customer/payment-report/${machineId}?startDate=${startDate}&endDate=${endDate}`} disabled={!(startDate && endDate)}>Relatório</ActionButton>
			<ActionButton callback={() => handleDownloadReport()}  disabled={!(startDate && endDate)}>PDF</ActionButton>
		</div>
	);
}