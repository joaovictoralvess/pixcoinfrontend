'use client';

import { SVGAttributes } from 'react';

export interface DollarIconProps extends SVGAttributes<SVGElement>{}

export default function DollarIcon({ ...rest }: DollarIconProps) {
	return (
		<svg
			color="currentcolor"
			strokeLinejoin="round"
			data-testid="geist-icon"
			viewBox="0 0 16 16"
			xmlns="http://www.w3.org/2000/svg"
			{...rest}
		>
			<path
				d="M8 14.5a6.5 6.5 0 100-13 6.5 6.5 0 000 13zM8 16A8 8 0 108 0a8 8 0 000 16zm.625-12.625v1H9c1.174 0 2.125.951 2.125 2.125h-1.25A.875.875 0 009 5.625h-.375v1.75H9a2.125 2.125 0 010 4.25h-.375v1h-1.25v-1H7A2.125 2.125 0 014.875 9.5h1.25c0 .483.392.875.875.875h.375v-1.75H7a2.125 2.125 0 010-4.25h.375v-1h1.25zm-1.25 2.25H7a.875.875 0 100 1.75h.375v-1.75zm1.25 3v1.75H9a.875.875 0 100-1.75h-.375z"
				clipRule="evenodd"
				fill="currentColor"
				fillRule="evenodd"
			/>
		</svg>
	)
}
