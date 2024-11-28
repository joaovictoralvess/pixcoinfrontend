'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

import { redirect } from 'next/navigation';

import './styles.scss';

export interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	updateTo: string;
	icon: ReactNode
	className?: string;
}

export default function ActionButton({ updateTo, icon, className, children,  ...rest }: ActionButtonProps) {
	return (
		<button onClick={() => redirect(updateTo)} className={`action-button ${className ? className : ''}`} {...rest}>
			{icon}
			{children}
		</button>
	)
}