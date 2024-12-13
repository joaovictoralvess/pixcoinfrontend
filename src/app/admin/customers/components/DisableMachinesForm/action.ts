'use server';

import AdminService from '@/services/Admin';

export const DisableMachines = async (_: any, formData: FormData) => {
	const customerId = `${formData.get('id')}`;
	if (!customerId) {
		return;
	}

	return await AdminService.disabledMachinesByCustomerId(customerId);
};