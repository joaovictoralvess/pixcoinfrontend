import SyncButton from '@/app/customer/machine-panel/components/SyncButton/SyncButton';

export interface PageTitleWithSyncProps {
	title: string;
	updateTo: string;
}

import './styles.scss';

export default function PageTitleWithSync({ title, updateTo }: PageTitleWithSyncProps) {
	return (
		<>
			<h1 className='page-title-with-sync--title'>{title}</h1>
			<SyncButton updateTo={updateTo}  />
		</>
	)
}