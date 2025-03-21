import { IMachine } from '@/interfaces/IMachine';

export interface CreateCustomerRequest {
	dataVencimento: string
	email: string;
	mercadoPagoToken: string;
	pagbankToken: string;
	pagbankEmail: string;
	nome: string
	senha: string;
}

export interface ICustomer {
	ativo: boolean;
	data_inclusao: string;
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
	maquinas: IMachine[];
	aviso?: string;
}

export interface EditCustomerRequest {
	dataVencimento: string
	nome: string
	pagbankToken: string
	pagbankEmail: string
	mercadoPagoToken: string
}