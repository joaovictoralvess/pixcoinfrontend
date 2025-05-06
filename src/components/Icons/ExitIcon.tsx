'use client';

import { SVGAttributes } from 'react';

export interface ExitIconProps extends SVGAttributes<SVGElement> {}

export default function ExitIcon({ ...rest }: ExitIconProps) {
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
				d="M3 3h4.5V2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h4.5v-1H3V3z"
				fill="currentColor"
			/>
			<path
				d="M13.854 8.354l-3-3a.5.5 0 0 0-.708.708L12.293 8H6.5v1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708z"
				fill="currentColor"
				fillRule="evenodd"
				clipRule="evenodd"
			/>
		</svg>
	);
}