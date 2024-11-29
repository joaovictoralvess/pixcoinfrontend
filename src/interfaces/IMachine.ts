export interface IMachine {
	clientId: string;
	dataInclusao: string;
	descricao: string;
	estoque: number | null;
	id: string;
	maquininha_serial: string | null;
	nome: string;
	pessoaId: string;
	pulso: string;
	status: 'ONLINE' | 'OFFLINE' | 'PAGAMENTO_RECENTE';
	store_id: string;
	ultimaRequisicao: string;
	ultimoPagamentoRecebido: string;
	valorDoPix: string;
	totalSemEstorno: number;
	totalEspecie: number;
	totalComEstorno: number;
}

export interface UpdateMachineRequest {
	descricao: string;
	estoque: number;
	id: string;
	nome: string;
	store_id: string;
	valorDoPulso: string;
}

export interface UpdateMachineResponse {
	error?: string;
}

export interface AddRemoteCrediteRequest {
	id: string;
	valor: string;
}

export interface AddRemoteCrediteResponse {
	msg?: string;
}