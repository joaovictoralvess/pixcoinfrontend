import { InputHTMLAttributes } from 'react';

import './styles.scss';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label: string;
}

export default function TextInput({ name, label, ...rest }: TextInputProps) {
	return (
		<div className='text-input-container'>
			<input id={name} {...rest} />
			<label htmlFor={name}>{label}</label>
			<span className='bar'></span>
		</div>
	)
}