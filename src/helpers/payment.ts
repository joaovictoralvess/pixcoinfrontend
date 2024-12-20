import { IPayment } from '@/interfaces/IPayment';
import { TableData } from '@/app/customer/machine-panel/components/PaymentTable/PaymentTable';

export const formatDateToDDMMYYYYHHMMSS = (date: Date, timeZone: string = 'America/Sao_Paulo') => {
	const formatter = new Intl.DateTimeFormat('pt-BR', {
		timeZone,
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	});

	return formatter.format(date).replace(',', '');
};

export const parseDDMMYYYYHHMMSS = (formattedDate: string, timeZone: string = 'America/Sao_Paulo'): string => {
	const [datePart, timePart] = formattedDate.split(' ');
	const [day, month, year] = datePart.split('/').map(Number);
	const [hours, minutes, seconds] = timePart.split(':').map(Number);

	const formatter = new Intl.DateTimeFormat('en-US', {
		timeZone,
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false,
	});

	const utcDate = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));
	return utcDate.toISOString();
};

export const retrievePaymentForm = (currentPaymentForm: string): string => {
	const paymentFormMap: Record<string, string> = {
		bank_transfer: 'PIX',
		CASH: 'Especie',
		debit_card: 'Débito',
		credit_card: 'Crédito',
		account_money: '',
	};

	return paymentFormMap[currentPaymentForm] || '';
};

export const formatToBRL = (value: string): string => {
	const number = parseFloat(value);
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	}).format(number);
}

export const retrieveReversedText = (reversed: boolean): 'Recebido' | 'Estornado' => {
	if (reversed) {
		return 'Estornado';
	}

	return 'Recebido'
}

export default function transformPaymentsData(payments: IPayment[]): TableData[] {
	return payments.map(payment => ({
		date: formatDateToDDMMYYYYHHMMSS(new Date(payment.data)),
		paymentForm: retrievePaymentForm(payment.tipo),
		value: formatToBRL(payment.valor),
		identifierMP: payment.mercadoPagoId,
		reversed: retrieveReversedText(payment.estornado),
		reason: payment.motivoEstorno,
	}));
}

export const retrieveDate = (isoDate: string): string => {
	const data = new Date(isoDate);

	const dia = String(data.getUTCDate()).padStart(2, '0');
	const mes = String(data.getUTCMonth() + 1).padStart(2, '0'); // Janeiro é 0
	const ano = data.getUTCFullYear();

	return  `${dia}/${mes}/${ano}`;
}

export const removeDuplicateMP = (data: IPayment[]): IPayment[] => {
	const uniqueData: IPayment[] = [];
	const seenIds = new Set<string>();

	data.forEach((item) => {
		if (!seenIds.has(item.mercadoPagoId)) {
			uniqueData.push(item);
			seenIds.add(item.mercadoPagoId);
		}
	});

	return uniqueData;
};