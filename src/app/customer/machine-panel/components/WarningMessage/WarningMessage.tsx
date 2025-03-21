'use client';

import { useState } from 'react';

import './style.scss';
import WarningIcon from '@/components/Icons/WarningIcon';

export interface WarningMessageProps {
	message?: string;
}

export default function WarningMessage({ message }: WarningMessageProps) {
	const [messageFromComponent, setMessageFromComponent] = useState<
		string | undefined
	>(message);
	return (
		<>
			{messageFromComponent && (
				<div className="add-warning__message">
					<div
						className="add-warning__close"
						onClick={() => setMessageFromComponent('')}
					></div>
					<div className="add-warning__wrapper-title">
						<strong>Aviso:</strong>
						<WarningIcon />
					</div>
					{messageFromComponent}
				</div>
			)}
		</>
	);
}
