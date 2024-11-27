import { ReactNode } from 'react';

import { SignInState } from '@/app/auth/customer/sign-in/actions';

export const resolvePasswordIcon = (inputType: string, callback: (value: (((prevState: ('password' | 'text')) => ('password' | 'text')) | 'password' | 'text')) => void): ReactNode => {
	if (inputType === 'password') {
		return (
			<span onClick={() => callback('text')}>🙈</span>
		);
	}

	return (
		<span onClick={() => callback('password')}>🐵</span>
	);
}

export const initialState: SignInState = {
	errors: {
		password: undefined,
		email: undefined,
	},
	isValid: undefined
};