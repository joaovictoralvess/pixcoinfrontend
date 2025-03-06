import { IPayment } from '@/interfaces/IPayment';
import { TableData } from '@/app/customer/machine-panel/components/PaymentTable/PaymentTable';

export const formatDateToDDMMYYYYHHMMSS = (
	date: Date,
	timeZone: string = 'America/Sao_Paulo'
) => {
	console.log(date);
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

export const retrievePaymentForm = (currentPaymentForm: string): string => {
	const paymentFormMap: Record<string, string> = {
		bank_transfer: 'PIX',
		CASH: 'Espécie',
		debit_card: 'Débito',
		credit_card: 'Crédito',
		account_money: 'PIX - QR Code',
		remote_credit: 'Crédito Remoto'
	};

	return paymentFormMap[currentPaymentForm] || '';
};

export const formatToBRL = (value: string): string => {
	const number = parseFloat(value);
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	}).format(number);
};

export const retrieveReversedText = (
	reversed: boolean
): 'Recebido' | 'Estornado' => {
	if (reversed) {
		return 'Estornado';
	}

	return 'Recebido';
};

export default function transformPaymentsData(
	payments: IPayment[]
): TableData[] {
	return payments.map((payment) => ({
		date: adjustDateToBR(payment.data),
		paymentForm: retrievePaymentForm(payment.tipo),
		value: formatToBRL(payment.valor),
		identifierMP: handleIdentifierMP(payment.mercadoPagoId),
		reversed: retrieveReversedText(payment.estornado),
		reason: payment.motivo_estorno,
	}));
}

export const handleIdentifierMP = (identifier: string) => {
	if (identifier.length >= 36) {
		return `PagSeguro-${identifier.slice(0, 8)}`;
	}
	return identifier;
}

export const retrieveDate = (isoDate: string): string => {
	const data = new Date(isoDate);

	const dia = String(data.getUTCDate()).padStart(2, '0');
	const mes = String(data.getUTCMonth() + 1).padStart(2, '0'); // Janeiro é 0
	const ano = data.getUTCFullYear();

	return `${dia}/${mes}/${ano}`;
};

export const removeDuplicateMP = (data: IPayment[]) => {
	const uniqueData: IPayment[] = [];
	const seenItems = new Set();

	data.forEach((item) => {
		const key = `${item.mercadoPagoId}-${item.valor}-${item.id}`;
		if (!seenItems.has(key)) {
			uniqueData.push(item);
			seenItems.add(key);
		}
	});

	return uniqueData;
};

export const adjustDateToBR = (date: string): string => {
	const match = date.match(/\d+/g);
	if (!match || match.length < 6) {
		return "Ocorreu um erro ao formatar a data."
	}

	const [year, month, day, hour, minute, second] = match;
	return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
};