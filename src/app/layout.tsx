import { ReactNode } from 'react';
import { Manrope } from 'next/font/google'
import type { Metadata } from 'next';

import './globals.css';

const manrope = Manrope({
	subsets: ['latin']
});

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
			<body className={manrope.className}>
				{children}
			</body>
		</html>
	);
}
