'use client';

import { SVGAttributes, useTransition } from 'react';
import { useRouter } from 'next/navigation';

import Loading from '@/components/UI/Loading/Loading';

export interface GoBackIconProps extends SVGAttributes<SVGElement> {
	goTo: string;
}

export default function GoBackIcon({
	goTo,
	...rest
}: Readonly<GoBackIconProps>) {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	return (
		<>
			<svg
				onClick={() =>
					startTransition(() => {
						router.push(goTo);
					})
				}
				width={25}
				height={25}
				color="currentcolor"
				strokeLinejoin="round"
				data-testid="geist-icon"
				viewBox="0 0 16 16"
				xmlns="http://www.w3.org/2000/svg"
				{...rest}
			>
				<path
					d="m6.4697 13.78 0.53033 0.5304 1.0607-1.0607-0.53033-0.5303-3.9697-3.9697h11.439v-1.5h-11.439l4.5-4.5-1.0607-1.0607-5.6036 5.6036c-0.39052 0.39052-0.39052 1.0237 0 1.4142l5.0732 5.0732z"
					clipRule="evenodd"
					fill="currentColor"
					fillRule="evenodd"
				/>
			</svg>

			{isPending && <Loading useInRoot />}
		</>
	);
}
