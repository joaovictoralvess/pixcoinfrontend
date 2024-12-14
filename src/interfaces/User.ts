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
}

export interface SignInUser {
	email: string;
	senha: string;
}