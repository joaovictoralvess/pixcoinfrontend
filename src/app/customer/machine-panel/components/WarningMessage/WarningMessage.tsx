'use client';

import { useState } from 'react';

import './style.scss';

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
					<strong>Aviso:</strong> {messageFromComponent}
				</div>
			)}
		</>
	);
}
