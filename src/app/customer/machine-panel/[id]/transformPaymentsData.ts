import { IPayment } from '@/interfaces/IPayment';
import { TableData } from '@/app/customer/machine-panel/components/Table/Table';
import { formatToBRL, retrieveFormattedDate, retrievePaymentForm, retrieveReversedText } from '@/helpers/payment';

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

