import { InputHTMLAttributes, ReactNode } from 'react';

import './styles.scss';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	type?: string;
	label?: string;
	icon?: ReactNode;
	error?: string;
}

export default function TextInput({
	name,
	label,
	icon,
	error,
	type,
	...rest
}: TextInputProps) {
	return (
		<div className={`input-ui ${type === 'hidden' ? 'input-ui--hidden' : ''}`}>
			<input type={type} name={name} id={name} {...rest} />
			{label && <label htmlFor={name}>{label}</label>}
			<span className="bar"></span>
			{icon && (<span className='icon'>{icon}</span>)}
			{error && <span className='error'>{error}</span>}
		</div>
	)
}