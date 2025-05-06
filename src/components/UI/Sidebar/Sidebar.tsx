'use client';

import Link from 'next/link';

import { signOut } from '@/app/auth/customer/sign-out/actions';

export interface SidebarProps {
	open: boolean;
}

import './styles.scss';
import HowToUseIcon from '@/components/Icons/HowToUseIcon';
import ExitIcon from '@/components/Icons/ExitIcon';

export default function Sidebar({ open }: Readonly<SidebarProps>) {
	return (
		<aside className={`sidebar ${open ? 'sidebar--open' : ''}`}>
			<nav>
				<Link href={'/how-to-use'}>
					<HowToUseIcon width={20} />
					Como usar a telemetria
				</Link>

				<button onClick={signOut} type="button">
					<ExitIcon width={20} />
					Sair
				</button>
			</nav>
		</aside>
	)
}