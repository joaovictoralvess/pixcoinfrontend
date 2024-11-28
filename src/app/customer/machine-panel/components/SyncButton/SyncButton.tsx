'use client';

import { redirect } from 'next/navigation';
import { SyncIcon } from '@/components/Icons/SyncIcon';

export default function SyncButton() {
	return (
		<button onClick={() => redirect('/customer/machine-panel')} className='machine-panel__container__btn'>
			<SyncIcon
				width={10}
				height={10}
			/>
			Atualizar
		</button>
	)
}