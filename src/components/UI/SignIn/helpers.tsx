import { ReactNode } from 'react';
import { SignInState } from '@/components/UI/SignIn/actions';

export const resolvePasswordIcon = (
	inputType: string,
	callback: (
		value:
			| ((prevState: 'password' | 'text') => 'password' | 'text')
			| 'password'
			| 'text'
	) => void
): ReactNode => {
	if (inputType === 'password') {
		return (
			<span title="Exibir senha" onClick={() => callback('text')}>
				🙈
			</span>
		);
	}

	return (
		<span title="Esconder senha" onClick={() => callback('password')}>
			🐵
		</span>
	);
};

export const initialState: SignInState = {
	errors: {
		password: undefined,
		email: undefined,
	},
	isValid: undefined,
};
