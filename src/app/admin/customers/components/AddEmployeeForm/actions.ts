'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z, ZodError } from 'zod';

import { dealWithZodErrors } from '@/helpers/zodError';
import { CreateEmployeeRequest } from '@/interfaces/ICustomer';
import CustomersService from '@/services/Customers';

export interface AddEmployeeErros {
	name?: string,
	email?: string,
	password?: string,
	machinesId?: string,
}

export interface AddEmployeeState {
	isValid?: boolean,
	errors: AddEmployeeErros;
}

const validateEditMachineForm = (formData: FormData): AddEmployeeState => {
	const userSchema =
		z
			.object({
				name: z.string().min(3, 'Nome deve conter no mínimo 3 dígitos.'),
				email: z.string().email('E-mail inválido.'),
				password: z.string().min(6, 'Senha deve conter no mínimo 6 dígitos.'),
			});

	try {
		userSchema.parse(Object.fromEntries(formData));
	} catch (error: unknown) {
		if (error instanceof ZodError) {
			return dealWithZodErrors<AddEmployeeState, AddEmployeeErros>(error);
		}
	}

	return {
		isValid: true,
		errors: {}
	}
};

export const handleCreateEmployee = async (prevState: any, formData: FormData) => {
	const validation = validateEditMachineForm(formData);
	if (!validation.isValid) {
		return {...prevState, ...validation};
	}

	const machinesIds = formData.getAll("machinesId[]");

	if (machinesIds.length === 0) return {
		isValid: false,
		errors: {
			machinesIds: "Selecione pelo menos uma máquina"
		}
	}

	const data: CreateEmployeeRequest = {
		nome: `${formData.get('name')}`,
		email: `${formData.get('email')}`,
		senha: `${formData.get('password')}`,
		id: `${formData.get('id')}`,
		canDelete: `${formData.get('canDelete')}`,
		canAddCredit: `${formData.get('canAddCredit')}`,
		canEditMachine: `${formData.get('canEditMachine')}`,
		machinesIds,
	};

	await CustomersService.createEmployee(data);

	revalidatePath('/customer/machine-panel');
	redirect('/customer/machine-panel');
};