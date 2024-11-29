'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z, ZodError } from 'zod';

import { dealWithZodErrors } from '@/helpers/zodError';

export interface EditMachineErros {
	name?: string,
	description?: string,
	value?: string,
	stock?: string,
}

export interface EditMachineState {
	isValid?: boolean,
	errors: EditMachineErros;
}

const validateEditMachineForm = (formData: FormData): EditMachineState => {
	const userSchema =
		z
			.object({
				name: z.string().min(3, '"Nome" deve conter no mínimo 3 dígitos.'),
				description: z.string().min(3, '"Descrição" deve conter no mínimo 3 dígitos.'),
				value: z.string().min(1, '"Valor do pulso" nao pode ser vazio.'),
			});

	try {
		userSchema.parse(Object.fromEntries(formData));
	} catch (error: unknown) {
		if (error instanceof ZodError) {
			return dealWithZodErrors<EditMachineState, EditMachineErros>(error);
		}
	}

	return {
		isValid: true,
		errors: {}
	}
};

export const handleEditMachine = async (prevState: any, formData: FormData) => {
	console.log(formData);
	const validation = validateEditMachineForm(formData);
	if (!validation.isValid) {
		return {...prevState, ...validation};
	}

	const data = {
		nome: `${formData.get('name')}`,
		descricao: `${formData.get('description')}`,
		estoque: `${formData.get('stock')}`,
		valorDoPulso: `${formData.get('value')}`,
	};

	console.log(data);

	// revalidatePath('/customer/machine-panel');
	// redirect('/customer/machine-panel')
};