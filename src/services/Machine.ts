import { IMachine } from '@/interfaces/IMachine';
import { getSession } from '@/helpers/session';
import { ICustomer } from '@/interfaces/ICustomer';

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
	}
}

export default MachineService;