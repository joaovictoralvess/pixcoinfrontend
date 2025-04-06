import { createPortal } from 'react-dom';

export interface LoadingProps {
	useInRoot?: boolean
}

import './styles.scss'

export default function Loading({ useInRoot }: Readonly<LoadingProps>) {
	if (useInRoot) {
		const content = (
			<div className="loadingOverlay">
				<div className="spinner"></div>
			</div>
		);

		return createPortal(
			content,
			document.getElementById('loading-root')!
		);
	}
	return (
		<div className="loadingOverlay">
			<div className="spinner"></div>
		</div>
	);
}