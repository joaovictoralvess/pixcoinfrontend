'use server';

import { z, ZodError } from 'zod';

import { dealWithZodErrors } from '@/helpers/zodError';

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

export const handleSignInForm = async (prevState: any, formData: FormData) => {
	const validation = validateSignUpForm(formData);
	if (!validation.isValid) {
		return {...prevState, ...validation};
	}

	// const data = {
	// 	email: `${formData.get('email')}`,
	// 	password: `${formData.get('password')}`,
	// };

	// const user = await UsersService.signIn(data);
	// if (!user) {
	// 	return {
	// 		isValid: false,
	// 		errors: {
	// 			email: 'E-mail or password invalid!',
	// 			password: 'E-mail or password invalid!',
	// 		}
	// 	}
	// }

	return {
		isValid: false,
		errors: {
			email: 'E-mail ou senha inválido.',
			password: 'E-mail ou senha inválido.',
		}
	}
};