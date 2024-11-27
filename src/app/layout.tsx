import { ReactNode } from 'react';
import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
	title: 'PIXcoin',
	description: 'Dashboard da Pixcoin',
	keywords: ['PIXcoin', 'PIX', 'coin']
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<body>
				{children}
			</body>
		</html>
	);
}
