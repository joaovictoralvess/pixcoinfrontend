'use client';

export interface SidebarProps {
	open: boolean;
}

import './styles.scss';

export default function Sidebar({ open }: Readonly<SidebarProps>) {
	return (
		<aside className={`sidebar ${open ? 'sidebar--open' : ''}`}></aside>
	)
}