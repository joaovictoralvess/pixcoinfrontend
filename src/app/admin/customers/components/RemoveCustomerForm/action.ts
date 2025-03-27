'use server';

import AdminService from '@/services/Admin';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import CustomersService from '@/services/Customers';

export const RemoveCustomer = async (_: any, formData: FormData) => {
	const customerId = `${formData.get('id')}`;
	const isEmployee = `${formData.get('isEmployee')}`;
	if (!customerId) {
		return;
	}

	if (isEmployee === '1') {
		await CustomersService.deleteEmployee(customerId);
		revalidatePath('/customer/employees');
		return redirect('/customer/employees')
	}

	await AdminService.removeCustomer(customerId);

	revalidatePath('/admin/customers');
	redirect('/admin/customers')
};