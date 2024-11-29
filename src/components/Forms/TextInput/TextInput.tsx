import { InputHTMLAttributes, ReactNode } from 'react';

import './styles.scss';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label?: string;
	icon?: ReactNode;
	error?: string;
}

export default function TextInput({
	name,
	label,
	icon,
	error,
	...rest
}: TextInputProps) {
	return (
		<div className='text-input-container'>
			<input name={name} id={name} {...rest} />
			{label && <label htmlFor={name}>{label}</label>}
			<span className="bar"></span>
			{icon && (<span className='icon'>{icon}</span>)}
			{error && <span className='error'>{error}</span>}
		</div>
	)
}