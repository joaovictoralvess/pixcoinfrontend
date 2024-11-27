import { getSession } from '@/helpers/session';
import { ICustomer } from '@/interfaces/ICustomer';

import './styles.scss';
import { customerSignOut } from '@/app/auth/customer-sign-out/actions';

export default async function Header() {
	const user = await getSession() as ICustomer;

	return (
		<header className='header'>
			<div className='header__title-wrapper'>
				<span className="header__title-wrapper__logo">PIXcoin</span>
				<span className='header__title-wrapper__customer'>Olá, {user.name}</span>
			</div>

			<nav className="header__right">
				<ul className='header__right__list'>
					<li className='header__right__list__item'>
						<button onClick={customerSignOut} type='button' className='header__right__list__item__button'>Sair</button>
					</li>
				</ul>
			</nav>
		</header>
	)
}