'use client';

import Link from 'next/link';

import { signOut } from '@/app/auth/customer/sign-out/actions';

export interface SidebarProps {
	open: boolean;
}

import HowToUseIcon from '@/components/Icons/HowToUseIcon';
import ExitIcon from '@/components/Icons/ExitIcon';
import DownloadIcon from '@/components/Icons/DownloadIcon';

import './styles.scss';

export default function Sidebar({ open }: Readonly<SidebarProps>) {
	return (
		<aside className={`sidebar ${open ? 'sidebar--open' : ''}`}>
			<nav>
				<Link href={'/how-to-use'}>
					<HowToUseIcon width={25} />
					Como usar a telemetria
				</Link>

				<a href="/docs/Como Conectar a Rede no SistemaPIXcoin.pdf" download>
					<DownloadIcon width={35} />
					Como conectar a rede no sistema PIXcoin (PDF)
				</a>

				<a href="/docs/Como Configurar e Restaurar a Máquina de Cartão.pdf" download>
					<DownloadIcon width={41} />
					Como configurar e restaurar a máquina de cartão (PDF)
				</a>

				<button onClick={signOut} type="button">
					<ExitIcon width={25} />
					Sair
				</button>
			</nav>
		</aside>
	)
}