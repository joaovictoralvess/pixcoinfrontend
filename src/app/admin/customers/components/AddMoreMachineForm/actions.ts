'use server';

import { z, ZodError } from 'zod';

import { dealWithZodErrors } from '@/helpers/zodError';
import { CreateMachineRequest } from '@/interfaces/IMachine';
import AdminService from '@/services/Admin';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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
				description: z.string().min(1, 'Descrição deve conter no mínimo 1 dígitos.'),
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

	const clienteId = String(formData.get('clienteId'));
	const bonusPlay = `${formData.get('bonusPlay')}` === 'on';
	const tabledBonus = `${formData.get('tabledBonus')}` === 'on';

	const data: CreateMachineRequest = {
		nome: `${formData.get('name')}`,
		descricao: `${formData.get('description')}`,
		store_id: `${formData.get('store_id')}`,
		valorDoPulso: `${formData.get('pulse_value')}`,
		clienteId,
		maquininha_serial: String(formData.get('serial')),
		valorDoPix: '',
		tempoLow: Number(`${formData.get('timeLow')}`),
		tempoHigh: Number(`${formData.get('timeHigh')}`),
		moves: bonusPlay ? Number(`${formData.get('moves')}`) : 0,
		bonus: bonusPlay ? Number(`${formData.get('bonus')}`) : 0,
		bonusPlay,
		tabledBonus,
		bonus_five: tabledBonus ? Number(`${formData.get('five')}`) : 0,
		bonus_ten: tabledBonus ? Number(`${formData.get('ten')}`) : 0,
		bonus_twenty: tabledBonus ? Number(`${formData.get('twenty')}`) : 0,
		bonus_fifty: tabledBonus ? Number(`${formData.get('fifity')}`) : 0,
		bonus_hundred: tabledBonus ? Number(`${formData.get('hundred')}`) : 0,
	};

	const resp = await AdminService.createMachine(data);

	if (resp.message && resp.message !== 'Máquina criada com sucesso!') {
		return {
			isValid: false,
			errors: {
				name: 'Ocorreu um erro!'
			}
		}
	}

	revalidatePath(`/admin/customers/${clienteId}`);
	redirect(`/admin/customers/${clienteId}`);
};