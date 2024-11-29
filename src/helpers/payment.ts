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
	switch (currentPaymentForm) {
		case 'bank_transfer':
			return 'PIX';
		case 'CASH':
			return 'Especie';
		case 'debit_card':
			return 'Débito';
		case 'credit_card':
			return 'Crédito';
		default:
			return ''
	}
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

export const statusMap = {
	PAGAMENTO_RECENTE: 'PAGAMENTO RECENTE',
	OFFLINE: 'OFFLINE',
	ONLINE: 'ONLINE',
};