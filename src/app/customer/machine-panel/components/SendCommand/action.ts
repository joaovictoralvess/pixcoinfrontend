'use server';

import MachineService from '@/services/Machine';

export const SendoCommandAction = async (state: any, formData: FormData) => {
	const machineId = formData.get('id')?.toString();
	const command = formData.get('command')?.toString();

	if (!machineId) {
		return {
			status: 'error',
			message: 'Machine ID is required',
		};
	}

	const request = {
		id: machineId!,
		command: command!
	};

	const response = await MachineService.executeESPCommand(request);
	return {
		status: response.status,
		message: response.message,
	};
}