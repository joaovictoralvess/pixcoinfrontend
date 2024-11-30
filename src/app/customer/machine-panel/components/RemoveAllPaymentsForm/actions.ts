'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import MachineService from '@/services/Machine';

export const RemoveAllPayments = async (_: any, formData: FormData) => {
	const machineId = `${formData.get('id')}`;
	if (!machineId) {
		return;
	}

	await MachineService.removeAllPayments(machineId);

	revalidatePath('/customer/machine-panel');
	redirect('/customer/machine-panel')
};