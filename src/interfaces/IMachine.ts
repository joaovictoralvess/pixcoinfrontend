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
	disabled: boolean
}

export interface UpdateMachineRequest {
	descricao: string;
	estoque: number;
	id: string;
	nome: string;
	store_id: string;
	valorDoPulso: string;
	maquininha_serial: string;
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

export interface RemovePaymentsResponse {
	message: string;
}

export interface RemoveMachineResponse {
	message: string;
}

export interface CreateMachineRequest {
	clienteId: string;
	descricao: string;
	nome: string;
	store_id: string;
	valorDoPulso: string;
	valorDoPix: string;
	maquininha_serial: string;
}

export interface CreateMachineResponse {
	clienteId: string;
	dataInclusao: string;
	descricao: string;
	id: string;
	maquininha_serial: string;
	nome: string;
	pessoaId: string;
	store_id: string;
	valorDoPulso: string;
}