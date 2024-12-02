'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z, ZodError } from 'zod';

import { dealWithZodErrors } from '@/helpers/zodError';
import { createSession } from '@/helpers/session';
import { SignInUser } from '@/interfaces/User';

import CustomersService from '@/services/Customers';
import AdminService from '@/services/Admin';

export interface SignInError {
	email?: string,
	password?: string,
}

export interface SignInState {
	isValid?: boolean,
	errors: SignInError;
}

const validateSignUpForm = (formData: FormData): SignInState => {
	const userSchema =
		z
			.object({
				email: z.string().email('E-mail inválido.'),
				password: z.string().min(6, 'Senha deve conter no mínimo 6 dígitos.'),
			});

	try {
		userSchema.parse(Object.fromEntries(formData));
	} catch (error: unknown) {
		if (error instanceof ZodError) {
			return dealWithZodErrors<SignInState, SignInError>(error);
		}
	}

	return {
		isValid: true,
		errors: {}
	}
};

const adminLogin = async (data: SignInUser) => {
	const user = await AdminService.signIn(data);
	if (user?.error) {
		return {
			isValid: false,
			errors: {
				email: 'E-mail ou senha inválido.',
				password: 'E-mail ou senha inválido.',
			}
		}
	}
}

export const handleSignInForm = async (prevState: any, formData: FormData) => {
	const validation = validateSignUpForm(formData);
	if (!validation.isValid) {
		return {...prevState, ...validation};
	}

	const data = {
		email: `${formData.get('email')}`,
		senha: `${formData.get('password')}`,
	};

	const isAdmin = `${formData.get('admin')}`;

	if (isAdmin) {
		await adminLogin(data);
		return;
	}

	const user = await CustomersService.signIn(data);
	if (user?.error) {
		return {
			isValid: false,
			errors: {
				email: 'E-mail ou senha inválido.',
				password: 'E-mail ou senha inválido.',
			}
		}
	}

	await createSession(JSON.stringify(user));

	revalidatePath('/customer/machine-panel');
	redirect('/customer/machine-panel')
};