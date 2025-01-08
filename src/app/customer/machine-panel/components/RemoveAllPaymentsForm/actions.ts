'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import MachineService from '@/services/Machine';
import { getSession } from '@/helpers/session';
import { User } from '@/interfaces/User';

export const RemoveAllPayments = async (_: any, formData: FormData) => {
	const machineId = `${formData.get('id')}`;
	if (!machineId) {
		return;
	}

	await MachineService.removeAllPayments(machineId);

	const user = await getSession() as User;
	if (user.key === 'ADMIN') {
		return;
	}

	revalidatePath('/customer/machine-panel');
	redirect('/customer/machine-panel')
};