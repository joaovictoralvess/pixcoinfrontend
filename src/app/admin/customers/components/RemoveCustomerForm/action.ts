'use server';

import AdminService from '@/services/Admin';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const RemoveCustomer = async (_: any, formData: FormData) => {
	const customerId = `${formData.get('id')}`;
	if (!customerId) {
		return;
	}

	await AdminService.removeCustomer(customerId);

	revalidatePath('/admin/customers');
	redirect('/admin/customers')
};