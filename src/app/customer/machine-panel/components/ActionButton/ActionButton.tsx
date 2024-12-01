'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

import { redirect } from 'next/navigation';

import './styles.scss';

export interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	updateTo?: string;
	icon?: ReactNode
	className?: string;
	callback?: () => void;
}

export default function ActionButton({ updateTo, icon, className, children, callback,  ...rest }: ActionButtonProps) {

	const handleClick = () => {
		if (updateTo) {
			redirect(updateTo);
		}

		if (callback !== undefined) {
			callback();
		}
	}

	return (
		<button onClick={() => handleClick()} className={`action-button ${className ? className : ''}`} {...rest}>
			{icon && icon}
			{children}
		</button>
	)
}