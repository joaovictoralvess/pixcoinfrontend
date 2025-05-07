'use client';

import { SVGAttributes } from 'react';

export interface DownloadIconProps extends SVGAttributes<SVGElement> {}

export default function DownloadIcon({ ...rest }: DownloadIconProps) {
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
				d="M14 8v4.667A1.333 1.333 0 0 1 12.667 14H3.333A1.333 1.333 0 0 1 2 12.667V8"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				fill="none"
			/>
			<path
				d="M11.333 6.667L8 10 4.667 6.667"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				fill="none"
			/>
			<path
				d="M8 10V2"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				fill="none"
			/>
		</svg>
	);
}