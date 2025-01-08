'use server';

import MachineService from '@/services/Machine';

export const RemoveSelectedPayments = async (_: any, formData: FormData) => {
	const machineId = `${formData.get('id')}`;
	const startDate = `${formData.get('startDate')}`;
	const endDate = `${formData.get('endDate')}`;

	if (!machineId || !endDate || !startDate) {
		return;
	}

	const { message } = await MachineService.removeSelectedPayments(machineId, startDate, endDate);
	return {
		message
	}
};