import {
	IMachine,
	AddRemoteCrediteRequest,
	AddRemoteCrediteResponse,
	RemovePaymentsResponse,
	UpdateMachineRequest,
	UpdateMachineResponse,
} from '@/interfaces/IMachine';
import { User } from '@/interfaces/User';
import { IPaymentResponse } from '@/interfaces/IPayment';

import { getSession } from '@/helpers/session';

const MachineService = {
	all: async (): Promise<IMachine[]> => {
		const user = await getSession() as User;

		const response = await fetch(`${process.env.REACT_APP_SERVIDOR}/maquinas`, {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"x-access-token": user.token
			},
		});

		return await response.json();
	},
	update: async (data: UpdateMachineRequest): Promise<UpdateMachineResponse> => {
		const user = await getSession() as User;

		const URI = `${process.env.REACT_APP_SERVIDOR}/${user.key === 'ADMIN' ? 'maquina' : 'maquina-cliente'}`;

		const response = await fetch(URI, {
			method: 'PUT',
			headers: {
				"Content-Type": "application/json",
				"x-access-token": user.token
			},
			body: JSON.stringify(data)
		});

		return await response.json();
	},
	addRemoteCredit: async (data: AddRemoteCrediteRequest): Promise<AddRemoteCrediteResponse> => {
		const user = await getSession() as User;

		const URI = `${process.env.REACT_APP_SERVIDOR}/${user.key === 'ADMIN' ? 'credito-remoto' : 'credito-remoto-cliente'}`;

		const response = await fetch(URI, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"x-access-token": user.token
			},
			body: JSON.stringify(data)
		});

		return await response.json();
	},

	paymentsByPeriod: async (machineId: string, data: {
		dataFim: string;
		dataInicio: string;
	}): Promise<IPaymentResponse> => {
		const user = await getSession() as User;

		const payload = JSON.stringify(data);

		const response = await fetch(`${process.env.REACT_APP_SERVIDOR}/pagamentos-periodo/${machineId}`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"x-access-token": user.token
			},
			body: payload
		});

		return await response.json();
	},
	payments: async (machineId: string): Promise<IPaymentResponse> => {
		const user = await getSession() as User;

		const response = await fetch(`${process.env.REACT_APP_SERVIDOR}/pagamentos/${machineId}`, {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"x-access-token": user.token
			},
		});

		return await response.json();
	},
	removeAllPayments: async (machineId: string): Promise<RemovePaymentsResponse> => {
		const user = await getSession() as User;

		const path = user.key === 'ADMIN' ? 'delete-pagamentos-adm' : 'delete-pagamentos';

		const response = await fetch(`${process.env.REACT_APP_SERVIDOR}/${path}/${machineId}`, {
			method: 'DELETE',
			headers: {
				"Content-Type": "application/json",
				"x-access-token": user.token
			},
		});

		return await response.json();
	}
}

export default MachineService;