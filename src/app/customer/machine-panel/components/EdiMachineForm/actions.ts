'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z, ZodError } from 'zod';

import { dealWithZodErrors } from '@/helpers/zodError';
import { UpdateMachineRequest } from '@/interfaces/IMachine';

import MachineService from '@/services/Machine';
import { getSession } from '@/helpers/session';
import { User } from '@/interfaces/User';

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
				description: z.string().min(1, '"Descrição" deve conter no mínimo 1 dígitos.'),
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
	const validation = validateEditMachineForm(formData);
	if (!validation.isValid) {
		return {...prevState, ...validation};
	}

	const bonusPlay = `${formData.get('bonusPlay')}` === 'on';
	const tabledBonus = `${formData.get('tabledBonus')}` === 'on';

	const data: UpdateMachineRequest = {
		nome: `${formData.get('name')}`,
		descricao: `${formData.get('description')}`,
		estoque: Number(formData.get('stock')),
		valorDoPulso: `${formData.get('value')}`,
		maquininha_serial: `${formData.get('serial')}`,
		store_id: `${formData.get('storeId')}`,
		id: `${formData.get('id')}`,
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

	const resp = await MachineService.update(data);
	if (resp.error) {
		return {
			isValid: false,
			errors: {
				name: resp.error.split(',')[0]
			}
		}
	}

	const user = await getSession() as User;
	if (user.key === 'ADMIN') {
		const customerId = String(formData.get('customerId'));
		revalidatePath(`/admin/customers/${customerId}`);
		redirect(`/admin/customers/${customerId}`)
	}

	revalidatePath('/customer/machine-panel');
	redirect('/customer/machine-panel')
};