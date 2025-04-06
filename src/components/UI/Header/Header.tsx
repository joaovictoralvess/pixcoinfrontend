import { ReactNode } from 'react';

import { generateRandomEmoji } from '@/helpers/emojis';
import { getSession } from '@/helpers/session';
import { User } from '@/interfaces/User';

import { signOut } from '@/app/auth/customer/sign-out/actions';

import './styles.scss';

export interface HeaderProps {
	iconLeft?: ReactNode;
}

export default async function Header({ iconLeft }: Readonly<HeaderProps>) {
	const user = (await getSession()) as User;

	return (
		<header className="header">
			<div className="header__title-wrapper">
				<span className="header__title-wrapper__logo">PIXcoin</span>
				<span className="header__title-wrapper__customer">
					Olá, {user.name} {generateRandomEmoji()}
				</span>
			</div>

			<nav className="header__right">
				<ul className="header__right__list">
					{iconLeft && (
						<li className="header__right__list__item">{iconLeft}</li>
					)}

					<li className="header__right__list__item">
						<button
							onClick={signOut}
							type="button"
							className="header__right__list__item__button"
						>
							Sair
						</button>
					</li>
				</ul>
			</nav>
		</header>
	);
}
