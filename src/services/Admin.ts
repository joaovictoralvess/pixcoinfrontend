import { User, SignInUser } from '@/interfaces/User';

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
	}
};

export default AdminService;