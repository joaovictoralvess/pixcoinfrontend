'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z, ZodError } from 'zod';

import { dealWithZodErrors } from '@/helpers/zodError';

import MachineService from '@/services/Machine';

export interface AddRemoteCreditErrors {
	value?: string,
}

export interface AddRemoteCreditState {
	isValid?: boolean,
	errors: AddRemoteCreditErrors;
}

const validateEditMachineForm = (formData: FormData): AddRemoteCreditState => {
	const userSchema =
		z
			.object({
				value: z.string().min(1, 'Valor do crédito não pode ser vazio.'),
			});

	try {
		userSchema.parse(Object.fromEntries(formData));
	} catch (error: unknown) {
		if (error instanceof ZodError) {
			return dealWithZodErrors<AddRemoteCreditState, AddRemoteCreditErrors>(error);
		}
	}

	return {
		isValid: true,
		errors: {}
	}
};

export const handleAddMachineCredit = async (prevState: any, formData: FormData) => {
	const validation = validateEditMachineForm(formData);
	if (!validation.isValid) {
		return {...prevState, ...validation};
	}

	const data = {
		valor: `${formData.get('value')}`,
		id: `${formData.get('id')}`,
	};

	const resp = await MachineService.addRemoteCredit(data);

	if (resp.msg) {
		return {
			isValid: false,
			errors: {
				value: resp.msg
			}
		}
	}

	revalidatePath('/customer/machine-panel');
	redirect('/customer/machine-panel')
};