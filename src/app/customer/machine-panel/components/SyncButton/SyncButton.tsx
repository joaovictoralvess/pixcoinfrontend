'use client';

import { redirect } from 'next/navigation';
import { SyncIcon } from '@/components/Icons/SyncIcon';

export interface SyncButtonProps {
	updateTo: string;
}

export default function SyncButton({ updateTo }: SyncButtonProps) {
	return (
		<button onClick={() => redirect(updateTo)} className='machine-panel__container__btn'>
			<SyncIcon
				width={10}
				height={10}
			/>
			Atualizar
		</button>
	)
}