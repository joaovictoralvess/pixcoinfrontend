import { IMachine } from '@/interfaces/IMachine';
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
	}
}

export default MachineService;