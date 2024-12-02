import { IPayment } from '@/interfaces/IPayment';
import { TableData } from '@/app/customer/machine-panel/components/PaymentTable/PaymentTable';

export const retrieveFormattedDate = (isoDate: string): string => {
	const date = new Date(isoDate);

	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();

	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0');

	return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
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
		date: retrieveFormattedDate(payment.data),
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