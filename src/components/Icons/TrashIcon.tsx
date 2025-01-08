'use client';

import { SVGAttributes } from 'react';

export interface TrashIconProps extends SVGAttributes<SVGElement>{}

export default function TrashIcon({ ...rest }: TrashIconProps) {
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
				d="M6.75 2.75a1.25 1.25 0 112.5 0V3h-2.5v-.25zM5.25 3v-.25a2.75 2.75 0 115.5 0V3H15v1.5h-1.115l-.707 9.192A2.5 2.5 0 0110.685 16h-5.37a2.5 2.5 0 01-2.493-2.308L2.115 4.5H1V3h4.25zm-.932 10.577L3.62 4.5h8.76l-.698 9.077a1 1 0 01-.997.923h-5.37a1 1 0 01-.997-.923z"
				clipRule="evenodd"
				fill="currentColor"
				fillRule="evenodd"
			/>
		</svg>
	)
}
