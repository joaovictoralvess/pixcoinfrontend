import { InputHTMLAttributes, ReactNode } from 'react';

import './styles.scss';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	type?: string;
	label?: string;
	icon?: ReactNode;
	error?: string;
	className?: string;
	info?: string;
}

export default function TextInput({
	name,
	label,
	icon,
	error,
	type,
	className,
	info,
	...rest
}: TextInputProps) {
	return (
		<div className={`input-ui ${className ? className : ''} ${type === 'hidden' ? 'input-ui--hidden' : ''} `}>
			<input type={type} name={name} id={name} {...rest} />
			{label && <label htmlFor={name}>{label}</label>}
			<span className="bar"></span>
			{icon && (<span className='icon'>{icon}</span>)}
			{error && <span className='error'>{error}</span>}
			{info && <span className='info'>{info}</span>}
		</div>
	)
}