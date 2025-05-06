'use client';

import { SVGAttributes } from 'react';

export interface HowToUseIconProps extends SVGAttributes<SVGElement> {}

export default function HowToUseIcon({ ...rest }: HowToUseIconProps) {
	return (
		<svg
			color="currentColor"
			strokeLinejoin="round"
			data-testid="geist-icon"
			viewBox="0 0 16 16"
			xmlns="http://www.w3.org/2000/svg"
			{...rest}
		>
			<path
				d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
				stroke="currentColor"
				strokeWidth="1.5"
				fill="none"
			/>
			<path
				d="M8 11V8"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
			<circle
				cx="8"
				cy="5"
				r="1"
				fill="currentColor"
			/>
		</svg>
	);
}