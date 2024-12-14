'use client';

import { SVGAttributes } from 'react';

export interface LoginIconProps extends SVGAttributes<SVGElement>{}

export default function LoginIcon({ ...rest }: LoginIconProps) {
	return (
		<svg
			width="1em"
			height="1em"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			{...rest}
		>
			<path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
			<path d="M10 17L15 12 10 7" />
			<path d="M15 12L3 12" />
		</svg>
	)
}
