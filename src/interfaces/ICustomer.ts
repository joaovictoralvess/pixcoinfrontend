export interface CreateCustomerRequest {
	dataVencimento: string
	email: string;
	mercadoPagoToken: string;
	nome: string
	senha: string;
}

export interface ICustomer {
	ativo: boolean;
	dataInclusao: string;
	dataVencimento: string;
	email: string;
	id: string;
	mercadoPagoToken: string;
	nome: string;
	pagbankEmail: string | null;
	pagbankToken: string | null;
	pessoaId: string;
	senha: string;
	ultimoAcesso: string | null;
	error?: string;
}
