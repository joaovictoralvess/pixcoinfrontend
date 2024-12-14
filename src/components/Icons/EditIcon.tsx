'use client';

import { SVGAttributes } from 'react';

export interface EditIconProps extends SVGAttributes<SVGElement>{}

export default function EditIcon({...rest}: EditIconProps) {
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
				d="M11.75.19l.53.53 3 3 .53.53-.53.53L5.16 14.901A3.75 3.75 0 012.507 16H0v-2.508A3.75 3.75 0 011.1 10.841L11.219.72l.531-.53zm0 2.12L9.81 4.25l1.94 1.94 1.94-1.94-1.94-1.94zm-9.591 9.592L8.75 5.31l1.94 1.939-6.592 6.59a2.25 2.25 0 01-1.59.66H1.5v-1.007c0-.597.237-1.17.659-1.591zM9 16h7v-1.5H9V16z"
				clipRule="evenodd"
				fill="currentColor"
				fillRule="evenodd"
			/>
		</svg>
	)
}