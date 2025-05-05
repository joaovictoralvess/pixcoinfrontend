import { ReactNode } from 'react';
import { Inter } from 'next/font/google'
import type { Metadata } from 'next';

import './globals.scss';

const inter = Inter({
	subsets: ['latin']
});

export const metadata: Metadata = {
	title: {
		default: 'PIXcoin - Telemetria',
		template: '%s | PIXcoin'
	},
	description: 'Telemetria completa para gerenciamento de PIXcoin, a sua melhor empresa para pagamentos digitais.',
	keywords: ['PIXcoin', 'PIX', 'coin', 'finanças', 'dashboard'],
	// authors: [{ name: 'Renato Almeida', url: 'https://seusite.com' }], @TODO: Descomentar quando tiver landingpage
	creator: 'PIXcoin',
	publisher: 'PIXcoin',
	// metadataBase: new URL('https://seusite.com'),
	alternates: {
		canonical: '/',
	},
	openGraph: {
		title: 'PIXcoin - Telemetria',
		description: 'Telemetria completa para gerenciamento de PIXcoin',
		url: 'https://seusite.com',
		siteName: 'PIXcoin',
		locale: 'pt_BR',
		type: 'website',
	},
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
