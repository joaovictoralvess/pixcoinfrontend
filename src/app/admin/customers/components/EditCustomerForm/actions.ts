'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z, ZodError } from 'zod';

import { dealWithZodErrors } from '@/helpers/zodError';
import { EditCustomerRequest } from '@/interfaces/ICustomer';
import AdminService from '@/services/Admin';

export interface EditCustomerErros {
	name?: string,
	token?: string,
	maturity?: string,
}

export interface EditCustomerState {
	isValid?: boolean,
	errors: EditCustomerErros;
}

const validateEditCustomer = (formData: FormData): EditCustomerState => {
	const userSchema =
		z
			.object({
				name: z.string().min(3, '"Nome" deve conter no mínimo 3 dígitos.'),
				token: z.string().min(1, 'Token deve ser preenchido.'),
				maturity: z.string().min(1, 'Vencimento deve ser preenchido.'),
			});

	try {
		userSchema.parse(Object.fromEntries(formData));
	} catch (error: unknown) {
		if (error instanceof ZodError) {
			return dealWithZodErrors<EditCustomerState, EditCustomerErros>(error);
		}
	}

	return {
		isValid: true,
		errors: {}
	}
};

export const handleEditCustomer = async (prevState: any, formData: FormData) => {
	const validation = validateEditCustomer(formData);
	if (!validation.isValid) {
		return {...prevState, ...validation};
	}

	const data: EditCustomerRequest = {
		nome: `${formData.get('name')}`,
		dataVencimento: new Date(`${formData.get('maturity')}`).toISOString(),
	};

	const id = `${String(formData.get('id'))}`;

	const resp = await AdminService.updateCustomer(data, id);
	if (resp.error) {
		return {
			isValid: false,
			errors: {
				name: resp.error
			}
		}
	}

	revalidatePath('/admin/customers');
	redirect('/admin/customers')
};