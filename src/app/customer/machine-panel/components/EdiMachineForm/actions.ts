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
				alue: z
					.string()
					.refine((val) => Number(val) > 0, {
						message: '"Valor" deve ser maior que 0.',
					}),
				stock: z
					.string()
					.refine((val) => Number(val) > 0, {
						message: '"Estoque" deve ser maior que 0.',
					}),
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
	const validation = validateEditMachineForm(formData);
	if (!validation.isValid) {
		return {...prevState, ...validation};
	}

	const data = {
		name: `${formData.get('name')}`,
		description: `${formData.get('description')}`,
	};

	console.log(data);

	revalidatePath('/customer/machine-panel');
	redirect('/customer/machine-panel')
};