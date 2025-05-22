export interface User {
	ativo: boolean;
	email: string;
	id: string;
	key: string;
	lastLogin: string;
	name: string;
	token: string;
	type: string;
	vencimento: string;
	warningMsg?: string;
	error?: string;
	employee?: boolean;
	canDeletePayments?: boolean;
	canAddRemoteCredit?: boolean;
	canEditMachine?: boolean;
	parent_id?: string
	maquinas_id?: string[]
}

export interface SignInUser {
	email: string;
	senha: string;
}