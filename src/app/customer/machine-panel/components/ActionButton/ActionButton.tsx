'use client';

import { ButtonHTMLAttributes, ReactNode, useTransition } from 'react';

import { useRouter } from 'next/navigation';

import Loading from '@/components/UI/Loading/Loading';

import './styles.scss';

export interface ActionButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	updateTo?: string;
	icon?: ReactNode;
	className?: string;
	callback?: () => void;
}

export default function ActionButton({
	updateTo,
	icon,
	className,
	children,
	callback,
	...rest
}: Readonly<ActionButtonProps>) {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const handleClick = () => {
		if (callback !== undefined && updateTo) {
			callback();
			startTransition(() => {
				router.push(updateTo);
			});
		}

		if (updateTo) {
			startTransition(() => {
				router.push(updateTo);
			});
		}

		if (callback !== undefined) {
			callback();
		}
	};

	return (
		<>
			<button
				onClick={() => handleClick()}
				className={`action-button ${className ? className : ''}`}
				{...rest}
			>
				{icon && icon}
				{children}
			</button>

			{isPending && <Loading useInRoot />}
		</>
	);
}
