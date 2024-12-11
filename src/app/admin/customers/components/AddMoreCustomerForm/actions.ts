'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z, ZodError } from 'zod';

import { dealWithZodErrors } from '@/helpers/zodError';
import { CreateCustomerRequest } from '@/interfaces/ICustomer';
import AdminService from '@/services/Admin';

export interface AddMoreCustomerErros {
	name?: string,
	description?: string,
	value?: string,
	stock?: string,
}

export interface AddMoreCustomerState {
	isValid?: boolean,
	errors: AddMoreCustomerErros;
}

const validateEditMachineForm = (formData: FormData): AddMoreCustomerState => {
	const userSchema =
		z
			.object({
				name: z.string().min(3, '"Nome" deve conter no mínimo 3 dígitos.'),
				email: z.string().email('E-mail inválido.'),
				password: z.string().min(6, 'Senha deve conter no mínimo 6 dígitos.'),
				token: z.string().min(1, 'Token deve ser preenchido.'),
				maturity: z.string().min(1, 'Vencimento deve ser preenchido.'),
			});

	try {
		userSchema.parse(Object.fromEntries(formData));
	} catch (error: unknown) {
		if (error instanceof ZodError) {
			return dealWithZodErrors<AddMoreCustomerState, AddMoreCustomerErros>(error);
		}
	}

	return {
		isValid: true,
		errors: {}
	}
};

export const handeCreateMoreCustomer = async (prevState: any, formData: FormData) => {
	const validation = validateEditMachineForm(formData);
	if (!validation.isValid) {
		return {...prevState, ...validation};
	}

	const data: CreateCustomerRequest = {
		nome: `${formData.get('name')}`,
		email: `${formData.get('email')}`,
		mercadoPagoToken: `${formData.get('token')}`,
		senha: `${formData.get('password')}`,
		dataVencimento: new Date(`${formData.get('maturity')}`).toISOString(),
	};

	const resp = await AdminService.createCustomer(data);
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