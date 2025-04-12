'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

import StatusScreenError from '@/components/Icons/StatusScreenError';

import './ErrorScreen.scss';
import Loading from '@/components/UI/Loading/Loading';

export default function ErrorScreen() {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const handleSync = () => {
		startTransition(() => {
			router.refresh();
		});
	};

	return (
		<div className="error-screen">
			<StatusScreenError className="error-screen__icon" />
			<h1 className="error-screen__title">Algo deu errado</h1>
			<p className="error-screen__message">
				Parece que tivemos um problema ao carregar a página. Tente atualizar para continuar.
			</p>
			<button className="error-screen__button" onClick={() => handleSync()}>
				Atualizar página
			</button>

			{isPending && <Loading useInRoot />}
		</div>
	);
}
