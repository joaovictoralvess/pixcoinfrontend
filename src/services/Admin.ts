import { User, SignInUser } from '@/interfaces/User';
import { CreateCustomerRequest, ICustomer } from '@/interfaces/ICustomer';
import { getSession } from '@/helpers/session';

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
	}
};

export default AdminService;