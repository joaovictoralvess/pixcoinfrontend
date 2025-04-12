import { User, SignInUser } from '@/interfaces/User';
import {
	CreateCustomerRequest,
	EditCustomerRequest,
	ICustomer,
} from '@/interfaces/ICustomer';
import {
	CreateMachineRequest,
	CreateMachineResponse,
} from '@/interfaces/IMachine';
import { IPaymentResponse } from '@/interfaces/IPayment';
import { IError } from '@/interfaces/IError';

import { getSession } from '@/helpers/session';

const AdminService = {
	signIn: async (data: SignInUser): Promise<User> => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_SERVIDOR}/login-pessoa`,
				{
					method: 'POST',
					body: JSON.stringify(data),
					headers: {
						'Content-Type': 'application/json',
					},
					keepalive: true,
				}
			);

			return await response.json();
		} catch (error) {
			return {
				error: 'Falha',
			} as User;
		}
	},
	createCustomer: async (
		data: CreateCustomerRequest
	): Promise<ICustomer | IError> => {
		try {
			const user = (await getSession()) as User;

			const response = await fetch(
				`${process.env.REACT_APP_SERVIDOR}/cliente`,
				{
					method: 'POST',
					body: JSON.stringify(data),
					headers: {
						'Content-Type': 'application/json',
						'x-access-token': user.token,
					},
				}
			);

			if (!response.ok) {
				return {
					error: `Ocorreu uma falha. Tente novamente - Error ${response.status} - ${response.statusText}`,
				};
			}

			return await response.json();
		} catch (error) {
			return {
				error: 'Ocorreu uma falha. Por favor, tente novamente!',
			};
		}
	},
	allCustomers: async (user: User): Promise<ICustomer[] | IError> => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_SERVIDOR}/clientes`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'x-access-token': user.token,
					},
				}
			);

			if (!response.ok) {
				return {
					error: `Ocorreu uma falha. Tente novamente - Error ${response.status} - ${response.statusText}`,
				};
			}

			return await response.json();
		} catch (error) {
			return {
				error: 'Ocorreu uma falha. Por favor, tente novamente!',
			};
		}
	},
	customer: async (id: string): Promise<ICustomer> => {
		try {
			const user = (await getSession()) as User;

			const response = await fetch(
				`${process.env.REACT_APP_SERVIDOR}/cliente?id=${id}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'x-access-token': user.token,
					},
					keepalive: true,
				}
			);

			return await response.json();
		} catch (error) {
			return {} as ICustomer;
		}
	},
	createMachine: async (
		data: CreateMachineRequest
	): Promise<CreateMachineResponse> => {
		const user = (await getSession()) as User;

		const response = await fetch(`${process.env.REACT_APP_SERVIDOR}/maquina`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': user.token,
			},
			body: JSON.stringify(data),
		});

		return await response.json();
	},
	updateCustomer: async (
		data: EditCustomerRequest,
		id: string
	): Promise<ICustomer> => {
		const user = (await getSession()) as User;

		const response = await fetch(
			`${process.env.REACT_APP_SERVIDOR}/alterar-cliente-adm-new/${id}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'x-access-token': user.token,
				},
				body: JSON.stringify(data),
			}
		);

		return await response.json();
	},
	payments: async (machineId: string): Promise<IPaymentResponse> => {
		const user = (await getSession()) as User;

		const response = await fetch(
			`${process.env.REACT_APP_SERVIDOR}/pagamentos-adm/${machineId}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'x-access-token': user.token,
				},
			}
		);

		return await response.json();
	},
	paymentsByPeriod: async (
		machineId: string,
		data: {
			dataFim: string;
			dataInicio: string;
		}
	): Promise<IPaymentResponse> => {
		const user = (await getSession()) as User;

		const payload = JSON.stringify(data);

		const response = await fetch(
			`${process.env.REACT_APP_SERVIDOR}/pagamentos-periodo-adm/${machineId}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-access-token': user.token,
				},
				body: payload,
			}
		);

		return await response.json();
	},
	disabledMachinesByCustomerId: async (
		customerId: string
	): Promise<{ message: string }> => {
		const user = (await getSession()) as User;

		const response = await fetch(
			`${process.env.REACT_APP_SERVIDOR}/disabled-machine-by-customer/${customerId}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-access-token': user.token,
				},
			}
		);

		return await response.json();
	},
	removeCustomer: async (customerId: string): Promise<{ message: string }> => {
		const user = (await getSession()) as User;

		const response = await fetch(
			`${process.env.REACT_APP_SERVIDOR}/cliente/${customerId}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'x-access-token': user.token,
				},
			}
		);

		return await response.json();
	},
	addWarningToCustomer: async (
		customerId: string,
		message: string,
		showForAll?: string
	): Promise<{
		message: string;
	}> => {
		const user = (await getSession()) as User;

		const response = await fetch(
			`${process.env.REACT_APP_SERVIDOR}/cliente/${customerId}/add-warning`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-access-token': user.token,
				},
				body: JSON.stringify({ message, showForAll }),
			}
		);

		return await response.json();
	},
	restorePassword: async ({
		customerId,
		password,
	}: {
		customerId: string;
		password: string;
	}) => {
		try {
			const user = (await getSession()) as User;

			const response = await fetch(
				`${process.env.REACT_APP_SERVIDOR}/cliente/restore-password/${customerId}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'x-access-token': user.token,
					},
					body: JSON.stringify({ password }),
				}
			);

			return await response.json();
		} catch (error) {
			console.log(error);
		}
	},
};

export default AdminService;
