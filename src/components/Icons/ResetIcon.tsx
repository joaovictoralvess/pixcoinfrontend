'use client';

import { SVGAttributes } from 'react';

export interface ResetNetworkIconProps extends SVGAttributes<SVGElement> {}

export default function ResetNetworkIcon({ ...rest }: ResetNetworkIconProps) {
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
				d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zm0 12a5.5 5.5 0 110-11 5.5 5.5 0 010 11z"
				fill="currentColor"
				fillRule="evenodd"
				clipRule="evenodd"
			/>
			<path
				d="M8 4.5a.75.75 0 01.75.75v2.69l1.22-1.22a.75.75 0 111.06 1.06l-2.5 2.5a.75.75 0 01-1.06 0l-2.5-2.5a.75.75 0 111.06-1.06l1.22 1.22V5.25A.75.75 0 018 4.5z"
				fill="currentColor"
			/>
		</svg>
	);
}