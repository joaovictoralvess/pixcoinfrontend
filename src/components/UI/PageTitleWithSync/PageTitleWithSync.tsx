'use client';

import { useTransition } from 'react';

import { useRouter } from 'next/navigation';
import ActionButton from '@/app/customer/machine-panel/components/ActionButton/ActionButton';
import { SyncIcon } from '@/components/Icons/SyncIcon';

export interface PageTitleWithSyncProps {
	title: string;
}

import './styles.scss';
import Loading from '@/components/UI/Loading/Loading';

export default function PageTitleWithSync({
	title,
}: Readonly<PageTitleWithSyncProps>) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const handleSync = () => {
		startTransition(() => {
			router.refresh();
		});
	};

	return (
		<>
			<h1 className="page-title-with-sync--title">{title}</h1>
			<ActionButton
				icon={<SyncIcon width={10} height={10} />}
				onClick={handleSync}
			>
				Atualizar
			</ActionButton>

			{isPending && <Loading useInRoot />}
		</>
	);
}
