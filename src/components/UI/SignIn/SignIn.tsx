import LoginIcon from '@/components/Icons/LoginIcon';
import Image from 'next/image';

import SignInForm from '@/components/UI/SignIn/SignInForm';

export interface SignInProps {
	isAdmin?: boolean;
}

import './styles.scss';

export default function SignIn({ isAdmin = false }: SignInProps) {
	return (
		<div className='sign-in-container'>
			<div className='sign-in-container__left-section'>
				<div className='sign-in-container__left-section__wrapper'>
					<div className="sign-in-container__left-section__wrapper__title">
						<LoginIcon
							width={24}
							height={24}
						/>
						<h1>Login</h1>
					</div>
					<span className="sign-in-container__left-section__wrapper__subtitle">Bem-vindo de volta! 😊</span>
				</div>

				<SignInForm isAdmin={isAdmin} />
			</div>

			<div className="sign-in-container__right-section">
				<Image
					src="/assets/images/pixcoin_logo.png"
					alt="Logo Pixcoin"
					width={0}
					height={0}
					sizes="100vw"
					style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
					priority
				/>
			</div>
		</div>
	)
}