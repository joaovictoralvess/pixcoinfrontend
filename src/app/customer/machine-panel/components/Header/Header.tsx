import { ReactNode } from 'react';

import { getSession } from '@/helpers/session';
import { ICustomer } from '@/interfaces/ICustomer';

import { signOut } from '@/app/auth/customer/sign-out/actions';

import './styles.scss';

export interface HeaderProps {
	iconLeft?: ReactNode;
}

export default async function Header({
	iconLeft,
}: HeaderProps) {
	const user = await getSession() as ICustomer;

	return (
		<header className='header'>
			<div className='header__title-wrapper'>
				<span className="header__title-wrapper__logo">PIXcoin</span>
				<span className='header__title-wrapper__customer'>Olá, {user.name}</span>
			</div>

			<nav className="header__right">
				<ul className='header__right__list'>
					{iconLeft && (
						<li className="header__right__list__item">
							{iconLeft}
						</li>
					)}

					<li className="header__right__list__item">
					<button onClick={signOut} type='button' className='header__right__list__item__button'>Sair</button>
					</li>
				</ul>
			</nav>
		</header>
	)
}