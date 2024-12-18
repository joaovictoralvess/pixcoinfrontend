'use client';

import { useState } from 'react';

import DatePickerRange from '@/components/Forms/DatePicker/DatePicker';
import ActionButton from '@/app/customer/machine-panel/components/ActionButton/ActionButton';

import { DownloadReportRequest } from '@/interfaces/Report';
import { downloadReport } from '@/components/UI/PaymentReport/download';

export interface PaymentReportProps {
	machineId: string;
	machineName: string;
	isAdmin?: boolean;
	customerId?: string;
}

import './styles.scss';

export default function PaymentReport({ machineId, isAdmin, customerId, machineName }: PaymentReportProps) {
	const [startDate, setStartDate] = useState<string>('');
	const [endDate, setEndDate] = useState<string>('');
	const [clearInput, setClearInput] = useState<boolean>(false);

	const handleDownloadReport = async () => {
		const newEndDate = new Date(endDate);
		newEndDate.setUTCHours(23, 59, 0, 0);

		const downloadData: DownloadReportRequest = {
			startDate,
			endDate: newEndDate.toISOString(),
			machineId
		}

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

	const resolvePathToFilter = (): string => {
		if (isAdmin) {
			return `/admin/customers/${customerId}/machine/${machineId}?machineName=${machineName}&startDate=${startDate}&endDate=${endDate}`;
		}

		return `/customer/machine-panel/${machineId}?machineName=${machineName}&startDate=${startDate}&endDate=${endDate}`;
	}

	const resolvePathToClearFilters = (): string => {
		if (isAdmin) {
			return `/admin/customers/${customerId}/machine/${machineId}?machineName=${machineName}`;
		}

		return `/customer/machine-panel/${machineId}?machineName=${machineName}`;
	}

	const resolvePathToReport = () => {
		if (isAdmin) {
			return `/customer/payment-report/${machineId}?machineName=${machineName}&startDate=${startDate}&endDate=${endDate}&customerId=${customerId}`;
		}

		return `/customer/payment-report/${machineId}?machineName=${machineName}&startDate=${startDate}&endDate=${endDate}`;
	}

	return (
		<div className='payment-report'>
			<DatePickerRange
				onSelectStartDate={(e) => {
					if (e.target.value) {
						setStartDate(new Date(e.target.value).toISOString());
						setClearInput(false);
					}
				}}
				onSelectEndDate={(e) => {
					if (e.target.value) {
						setEndDate(new Date(e.target.value).toISOString());
						setClearInput(false);
					}
				}}
				shouldClear={clearInput}
			/>

			<div className='payment-report__buttons'>
				<ActionButton updateTo={resolvePathToFilter()} disabled={!(startDate && endDate)}>Filtrar</ActionButton>
				<ActionButton updateTo={resolvePathToReport()} disabled={!(startDate && endDate)}>Relatório</ActionButton>
				<ActionButton callback={() => handleDownloadReport()}  disabled={!(startDate && endDate)}>PDF</ActionButton>
				<ActionButton callback={() => {
					setStartDate('');
					setEndDate('');
					setClearInput(true)
				}}
				updateTo={resolvePathToClearFilters()}
				disabled={!(startDate && endDate)}
				>
					Limpar Filtros
				</ActionButton>

				<ActionButton
					className='payment-report__buttons__delete'
					disabled={!(startDate && endDate)}
				>
					Excluir selecionados
				</ActionButton>
			</div>
		</div>
	);
}