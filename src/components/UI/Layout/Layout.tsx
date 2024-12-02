import { HTMLAttributes } from 'react';

import './styles.scss';

export interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
	className?: string;
}

export default function Layout({
	children,
	className,
	...rest
}: LayoutProps) {
	return (
		<div className={`machine-layout ${className ? className : ''}`} {...rest}>{children}</div>
	)
}