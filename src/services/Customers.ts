import { User, SignInUser } from '@/interfaces/User';

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
	}
};

export default CustomersService;