import { ReactNode } from 'react';

import { generateRandomEmoji } from '@/helpers/emojis';

import { signOut } from '@/app/auth/customer/sign-out/actions';

import Sidebar from '@/components/UI/Sidebar/Sidebar';

import './styles.scss';

export interface HeaderProps {
	iconLeft?: ReactNode;
	userName: string;
}

export default function Header({ iconLeft, userName }: Readonly<HeaderProps>) {

	return (
		<>
			<header className="header">
				<div className="header__title-wrapper">
					<button className="header__title-wrapper__burger-btn">
						<span className="header__title-wrapper__burger-btn__line"></span>
					</button>

					<div className="header__title-wrapper-logo">
						<span className="header__title-wrapper-logo__logo">PIXcoin</span>
						<span className="header__title-wrapper-logo__customer">
							Olá, {userName} {generateRandomEmoji()}
						</span>
					</div>
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

			<Sidebar />
		</>
	);
}
