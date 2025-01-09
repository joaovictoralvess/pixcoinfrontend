export interface IPaymentResponse {
	cash: number;
	estoque: string;
	estornos: number;
	total: number;
	pagamentos: IPayment[];
}

export interface IPayment {
	clientId: string;
	data: string;
	estornado: boolean;
	id: string;
	maquinaId: string;
	mercadoPagoId: string;
	motivo_estorno?: string;
	operadora: string;
	removido: boolean;
	taxas?: string;
	tipo: string;
	valor: string
}