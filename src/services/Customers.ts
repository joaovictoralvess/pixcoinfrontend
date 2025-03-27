import { User, SignInUser } from '@/interfaces/User';
import { getSession } from '@/helpers/session';
import { ICustomer } from '@/interfaces/ICustomer';

const CustomersService = {
	signIn: async (data: SignInUser): Promise<User> => {
		const response = await fetch(`${process.env.REACT_APP_SERVIDOR}/login-cliente`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		});

		return await response.json();
	},

	getWarning: async (id: string): Promise<{message: string}> => {
		const response = await fetch(`${process.env.REACT_APP_SERVIDOR}/warning/${id}`, {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
			},
		});

		return await response.json();
	},
	createEmployee: async (data: any): Promise<{message: string}> => {
		const user = await getSession() as User;

		const response = await fetch(`${process.env.REACT_APP_SERVIDOR}/create-employee`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"x-access-token": user.token
			},
			body: JSON.stringify(data),
		});

		return await response.json();
	},
	getEmployees: async (id: string, token: string): Promise<ICustomer[]> => {
		const response = await fetch(`${process.env.REACT_APP_SERVIDOR}/customer/${id}/employees`, {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"x-access-token": token
			},
		});

		return await response.json();
	},
};

export default CustomersService;