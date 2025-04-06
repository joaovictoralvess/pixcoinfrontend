'use server';

import AdminService from '@/services/Admin';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const RestorePassword = async (_: any, formData: FormData) => {
	const customerId = `${formData.get('id')}`;
	const password = `${formData.get('password')}`;
	if (!customerId) {
		return;
	}
	await AdminService.restorePassword({ password, customerId });

	revalidatePath(`/admin/customers/${customerId}`);
	redirect(`/admin/customers/${customerId}`)
};