import { InputHTMLAttributes, ReactNode } from 'react';

import './styles.scss';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label: string;
	icon?: ReactNode;
}

export default function TextInput({ name, label, icon, ...rest }: TextInputProps) {
	return (
		<div className='text-input-container'>
			<input id={name} {...rest} />
			<label htmlFor={name}>{label}</label>
			<span className='bar'></span>
			{icon && (<span className='icon'>{icon}</span>)}
		</div>
	)
}