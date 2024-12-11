import { User, SignInUser } from '@/interfaces/User';
import { CreateCustomerRequest, EditCustomerRequest, ICustomer } from '@/interfaces/ICustomer';
import { getSession } from '@/helpers/session';
import { CreateMachineRequest, CreateMachineResponse, UpdateMachineRequest } from '@/interfaces/IMachine';

const AdminService = {
	signIn: async (data: SignInUser): Promise<User> => {
		const response = await fetch(`${process.env.REACT_APP_SERVIDOR}/login-pessoa`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		});

		return await response.json();
	},
	createCustomer: async (data: CreateCustomerRequest): Promise<ICustomer> => {
		const user = await getSession() as User;

		const response = await fetch(`${process.env.REACT_APP_SERVIDOR}/cliente`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
				"x-access-token": user.token
			},
		});

		return await response.json();
	},
	allCustomers: async (): Promise<ICustomer[]> => {
		const user = await getSession() as User;

		const response = await fetch(`${process.env.REACT_APP_SERVIDOR}/clientes`, {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"x-access-token": user.token
			},
		});

		return await response.json();
	},
	customer: async (id: string): Promise<ICustomer> => {
		const user = await getSession() as User;

		const response = await fetch(`${process.env.REACT_APP_SERVIDOR}/cliente?id=${id}`, {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"x-access-token": user.token
			},
		});

		return await response.json();
	},
	createMachine: async (data: CreateMachineRequest): Promise<CreateMachineResponse> => {
		const user = await getSession() as User;

		const response = await fetch(`${process.env.REACT_APP_SERVIDOR}/maquina`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"x-access-token": user.token
			},
			body: JSON.stringify(data),
		});

		return await response.json();
	},
	updateCustomer: async (data: EditCustomerRequest, id: string): Promise<ICustomer> => {
		const user = await getSession() as User;

		const response = await fetch(`${process.env.REACT_APP_SERVIDOR}/alterar-cliente-adm-new/${id}`, {
			method: 'PUT',
			headers: {
				"Content-Type": "application/json",
				"x-access-token": user.token
			},
			body: JSON.stringify(data),
		});

		return await response.json();
	}
};

export default AdminService;