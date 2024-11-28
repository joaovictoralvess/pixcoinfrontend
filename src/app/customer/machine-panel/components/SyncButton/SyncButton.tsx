'use client';

import Image from 'next/image';
import { redirect } from 'next/navigation';

export default function SyncButton() {
	return (
		<button onClick={() => redirect('/customer/machine-panel')} className='machine-panel__container__btn'>
			<Image
				src='/assets/images/sync.svg'
				alt='Ícone de seta simbolizando login'
				width={10}
				height={10}
			/>
			Atualizar
		</button>
	)
}