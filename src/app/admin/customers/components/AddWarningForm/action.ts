'use server';

import AdminService from '@/services/Admin';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const AddWarningToClient = async (_: any, formData: FormData) => {
	const customerId = `${formData.get('id')}`;
	const message = `${formData.get('message')}`;
	const showForAll = `${formData.get('showForAll')}`;
	if (!customerId) {
		return;
	}

	const resp = await AdminService.addWarningToCustomer(customerId, message, showForAll);

	if (resp.message) {
		revalidatePath(`/admin/customers/${customerId}`);
		redirect(`/admin/customers/${customerId}`)
	}
};