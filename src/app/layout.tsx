import { ReactNode } from 'react';
import { Inter } from 'next/font/google'
import type { Metadata } from 'next';

import './globals.scss';

const inter = Inter({
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
		<html lang='pt-BR'>
		<body className={inter.className}>
		{children}
		<div id='modal-root'></div>
		<div id='loading-root'></div>
		</body>
		</html>
	);
}
