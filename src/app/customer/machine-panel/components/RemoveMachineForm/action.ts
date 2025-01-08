'use server';

import MachineService from '@/services/Machine';

export const RemoveMachine = async (_: any, formData: FormData) => {
	const machineId = `${formData.get('id')}`;
	if (!machineId) {
		return;
	}

	await MachineService.removeMachine(machineId);
};