'use client';

import { SVGAttributes } from 'react';

export interface WarningIconProps extends SVGAttributes<SVGElement>{}

export default function WarningIcon({ ...rest }: WarningIconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 512 512"
			xmlSpace="preserve"
			{...rest}
		>
			<path fill="#ffa418" d="M0 477.703L256 477.703 289.391 256 256 34.297z" />
			<path fill="#ff8a1e" d="M256 34.297L256 477.703 512 477.703z" />
			<g fill="#324860">
				<circle cx={256} cy={405.359} r={16.696} />
				<path d="M239.304 177.185H272.695V355.272H239.304z" />
			</g>
		</svg>
	)
}
