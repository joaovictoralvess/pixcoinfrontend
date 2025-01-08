'use client';

import { useRouter } from 'next/navigation';
import ActionButton from '@/app/customer/machine-panel/components/ActionButton/ActionButton';
import { SyncIcon } from '@/components/Icons/SyncIcon';

export interface PageTitleWithSyncProps {
	title: string;
	updateTo: string;
}

import './styles.scss';

export default function PageTitleWithSync({ title, updateTo }: PageTitleWithSyncProps) {
	const router = useRouter();

	const handleSync = () => {
		router.refresh();
	};

	return (
		<>
			<h1 className="page-title-with-sync--title">{title}</h1>
			<ActionButton
				icon={
					<SyncIcon
						width={10}
						height={10}
					/>
				}
				onClick={handleSync}
			>
				Atualizar
			</ActionButton>
		</>
	);
}
