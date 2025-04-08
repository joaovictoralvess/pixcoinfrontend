'use server';

import { z, ZodError } from 'zod';
import { dealWithZodErrors } from '@/helpers/zodError';
import { CommonService } from '@/services/Common';

export interface ForgotPasswordError {
	email?: string;
}

export interface ForgotPasswordState {
	isValid?: boolean;
	errors: ForgotPasswordError;
}

const validateForgotPasswordForm = (
	formData: FormData
): ForgotPasswordState => {
	const userSchema = z.object({
		email: z.string().email('E-mail inválido.'),
	});

	try {
		userSchema.parse(Object.fromEntries(formData));
	} catch (error: unknown) {
		if (error instanceof ZodError) {
			return dealWithZodErrors<ForgotPasswordState, ForgotPasswordError>(error);
		}
	}

	return {
		isValid: true,
		errors: {},
	};
};

export const handleSendForgotPasswordForm = async (
	prevState: any,
	formData: FormData
) => {
	const validation = validateForgotPasswordForm(formData);
	if (!validation.isValid) {
		return { ...prevState, ...validation };
	}

	const rawEmail = formData.get('email');
	const email = typeof rawEmail === 'string' ? rawEmail : '';

	const resp = await CommonService.forgotPassword({
		email,
	});

	if (resp.error) {
		return {
			isValid: true,
			errors: {
				email: resp.message,
			},
		};
	}

	return {
		isValid: true,
		errors: {},
		success: resp.message,
	};
};
