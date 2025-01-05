'use server';

import { z, ZodError } from 'zod';

import { dealWithZodErrors } from '@/helpers/zodError';
import { CreateMachineRequest } from '@/interfaces/IMachine';
import AdminService from '@/services/Admin';

export interface AddMoreMachineFormErros {
	name?: string,
	description?: string,
	store_id?: string,
	pulse_value?: string,
}

export interface AddMoreMachineState {
	isValid?: boolean,
	errors: AddMoreMachineFormErros;
}

const validateEditMachineForm = (formData: FormData): AddMoreMachineState => {
	const userSchema =
		z
			.object({
				name: z.string().min(3, '"Nome" deve conter no mínimo 3 dígitos.'),
				description: z.string().min(3, 'Descrição deve conter no mínimo 3 dígitos.'),
				store_id: z.string().min(3, 'StoreID precisa ter mínimo 3 dígitos.'),
				pulse_value: z.string().min(1, 'valor do pulse deve ser preenchido.'),
			});

	try {
		userSchema.parse(Object.fromEntries(formData));
	} catch (error: unknown) {
		if (error instanceof ZodError) {
			return dealWithZodErrors<AddMoreMachineState, AddMoreMachineFormErros>(error);
		}
	}

	return {
		isValid: true,
		errors: {}
	}
};

export const handleCreateMachine = async (prevState: any, formData: FormData) => {
	const validation = validateEditMachineForm(formData);
	if (!validation.isValid) {
		return {...prevState, ...validation};
	}

	const data: CreateMachineRequest = {
		nome: `${formData.get('name')}`,
		descricao: `${formData.get('description')}`,
		store_id: `${formData.get('store_id')}`,
		valorDoPulso: `${formData.get('pulse_value')}`,
		clienteId: String(formData.get('clienteId')),
		maquininha_serial: String(formData.get('serial')),
		valorDoPix: '',
		tempoDoPulso: Number(`${formData.get('pulseTime')}`),
	};

	const resp = await AdminService.createMachine(data);
	console.log(resp);
	if (resp.message && resp.message !== 'Máquina criada com sucesso!') {
		return {
			isValid: false,
			errors: {
				name: 'Ocorreu um erro!'
			}
		}
	}

	return {
		isValid: true,
		errors: {}
	}
};