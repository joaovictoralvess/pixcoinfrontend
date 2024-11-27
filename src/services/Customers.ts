import { ICustomer, ISignInCustomer } from '@/interfaces/ICustomer';

const CustomersService = {
	signIn: async (data: ISignInCustomer): Promise<ICustomer> => {
		const response = await fetch(`${process.env.REACT_APP_SERVIDOR}/login-cliente`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		});

		return await response.json();
	}
};

export default CustomersService;