import {
	IMachine,
	AddRemoteCrediteRequest,
	AddRemoteCrediteResponse,
	RemovePaymentsResponse,
	UpdateMachineRequest,
	UpdateMachineResponse,
	RemoveMachineResponse,
} from '@/interfaces/IMachine';
import { User } from '@/interfaces/User';
import { IPaymentResponse } from '@/interfaces/IPayment';
import { IError } from '@/interfaces/IError';

import { getSession } from '@/helpers/session';

const MachineService = {
	all: async (user: User): Promise<IMachine[] | IError> => {
		try {
			const response = await fetch(`${process.env.REACT_APP_SERVIDOR}/maquinas`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'x-access-token': user.token,
				},
			});

			return await response.json();
		} catch (error) {
			return {
				error: "Ocorreu um erro"
			}
		}
	},
	update: async (
		data: UpdateMachineRequest
	): Promise<UpdateMachineResponse> => {
		const user = (await getSession()) as User;

		const URI = `${process.env.REACT_APP_SERVIDOR}/${user.key === 'ADMIN' ? 'maquina' : 'maquina-cliente'}`;

		const response = await fetch(URI, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': user.token,
			},
			body: JSON.stringify(data),
		});

		return await response.json();
	},
	addRemoteCredit: async (
		data: AddRemoteCrediteRequest
	): Promise<AddRemoteCrediteResponse> => {
		const user = (await getSession()) as User;

		const URI = `${process.env.REACT_APP_SERVIDOR}/${user.key === 'ADMIN' ? 'credito-remoto' : 'credito-remoto-cliente'}`;

		const response = await fetch(URI, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': user.token,
			},
			body: JSON.stringify(data),
		});

		return await response.json();
	},

	paymentsByPeriod: async (
		machineId: string,
		data: {
			dataFim: string;
			dataInicio: string;
		}
	): Promise<IPaymentResponse> => {
		try {
			const user = (await getSession()) as User;

			const payload = JSON.stringify(data);

			const response = await fetch(
				`${process.env.REACT_APP_SERVIDOR}/pagamentos-periodo/${machineId}`,
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
		} catch (error) {
			return {
				error: "Ocorreu um erro"
			} as IPaymentResponse
		}
	},
	payments: async (machineId: string): Promise<IPaymentResponse> => {
		try {
			const user = (await getSession()) as User;

			const response = await fetch(
				`${process.env.REACT_APP_SERVIDOR}/pagamentos/${machineId}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'x-access-token': user.token,
					},
				}
			);

			return await response.json();
		} catch (error) {
			return {
				error: 'Ocorreu uma falha'
			} as IPaymentResponse
		}
	},
	removeAllPayments: async (
		machineId: string
	): Promise<RemovePaymentsResponse> => {
		const user = (await getSession()) as User;

		const path =
			user.key === 'ADMIN' ? 'delete-pagamentos-adm' : 'delete-pagamentos';

		const response = await fetch(
			`${process.env.REACT_APP_SERVIDOR}/${path}/${machineId}`,
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
	removeMachine: async (machineId: string): Promise<RemoveMachineResponse> => {
		const user = (await getSession()) as User;

		const response = await fetch(`${process.env.REACT_APP_SERVIDOR}/maquina`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': user.token,
			},
			body: JSON.stringify({ id: machineId }),
		});

		return await response.json();
	},
	removeSelectedPayments: async (
		machineId: string,
		startDate: string,
		endDate: string
	): Promise<{
		message: string;
	}> => {
		const user = (await getSession()) as User;
		const data = {
			machineId,
			startDate,
			endDate,
		};
		const payload = JSON.stringify(data);

		const response = await fetch(
			`${process.env.REACT_APP_SERVIDOR}/delete-selected-payments`,
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
	executeESPCommand: async(data: {id: string; command: string}): Promise<{status: string; message:string}> => {
		const response = await fetch(
			`${process.env.REACT_APP_SERVIDOR}/machine/${data.id}/${data.command}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		return await response.json();
	}
};

export default MachineService;
