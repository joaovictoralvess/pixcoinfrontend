import { ButtonHTMLAttributes, ReactNode } from 'react';

import './styles.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}

export default function Button({ children, ...rest }: ButtonProps) {
	return (
		<button {...rest}>{children}</button>
	)
}