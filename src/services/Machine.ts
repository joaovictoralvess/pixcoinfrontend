import {
	AddRemoteCrediteRequest,
	AddRemoteCrediteResponse,
	IMachine,
	UpdateMachineRequest,
	UpdateMachineResponse,
} from '@/interfaces/IMachine';
import { ICustomer } from '@/interfaces/ICustomer';
import { IPaymentResponse } from '@/interfaces/IPayment';

import { getSession } from '@/helpers/session';

const MachineService = {
	all: async (): Promise<IMachine[]> => {
		const user = await getSession() as ICustomer;

		const response = await fetch(`${process.env.REACT_APP_SERVIDOR}/maquinas`, {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"x-access-token": user.token
			},
		});

		return await response.json();
	},
	payments: async (machineId: string): Promise<IPaymentResponse> => {
		const user = await getSession() as ICustomer;

		const response = await fetch(`${process.env.REACT_APP_SERVIDOR}/pagamentos/${machineId}`, {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"x-access-token": user.token
			},
		});

		return await response.json();
	},
	update: async (data: UpdateMachineRequest): Promise<UpdateMachineResponse> => {
		const user = await getSession() as ICustomer;

		const response = await fetch(`${process.env.REACT_APP_SERVIDOR}/maquina-cliente`, {
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
		const user = await getSession() as ICustomer;

		const response = await fetch(`${process.env.REACT_APP_SERVIDOR}/credito-remoto-cliente`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"x-access-token": user.token
			},
			body: JSON.stringify(data)
		});

		return await response.json();
	}
}

export default MachineService;