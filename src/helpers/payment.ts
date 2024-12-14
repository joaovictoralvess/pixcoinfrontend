import { IPayment } from '@/interfaces/IPayment';
import { TableData } from '@/app/customer/machine-panel/components/PaymentTable/PaymentTable';

export const retrieveFormattedDate = (
	isoDate: string,
	useUTC = true,
	format = "DD/MM/YYYY HH:mm:ss"
): string => {
	const date = new Date(isoDate);

	const pad = (num: number) => String(num).padStart(2, "0");

	const getDatePart = (method: string) =>
		useUTC ? (date as any)[`getUTC${method}`]() : (date as any)[`get${method}`]();

	const day = pad(getDatePart("Date"));
	const month = pad(getDatePart("Month") + 1);
	const year = getDatePart("FullYear");
	const hours = pad(getDatePart("Hours")  - 3);
	const minutes = pad(getDatePart("Minutes"));
	const seconds = pad(getDatePart("Seconds"));

	return format
		.replace("DD", day)
		.replace("MM", month)
		.replace("YYYY", String(year))
		.replace("HH", hours)
		.replace("mm", minutes)
		.replace("ss", seconds);
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
		date: retrieveFormattedDate(payment.data, false),
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

export const removeDuplicateMP = (data: IPayment[]) => {
	const uniqueData: IPayment[] = [];
	const seenItems = new Set();

	data.forEach((item) => {
		const key = `${item.mercadoPagoId}-${item.valor}`;
		if (!seenItems.has(key)) {
			uniqueData.push(item);
			seenItems.add(key);
		}
	});

	return uniqueData;
};