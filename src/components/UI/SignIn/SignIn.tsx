import LoginIcon from '@/components/Icons/LoginIcon';
import Image from 'next/image';

import SignInForm from '@/components/UI/SignIn/SignInForm';

export interface SignInProps {
	isAdmin?: boolean;
	title?: string;
	subtitle?: string;
}

import './styles.scss';

export default function SignIn({ isAdmin = false, title = 'Login', subtitle = 'Bem-vindo de volta! 😊' }: SignInProps) {
	return (
		<div className='sign-in-container'>
			<div className='sign-in-container__left-section'>
				<div className='sign-in-container__left-section__wrapper'>
					<div className="sign-in-container__left-section__wrapper__title">
						<LoginIcon
							width={24}
							height={24}
						/>
						<h1>{title}</h1>
					</div>
					<span className="sign-in-container__left-section__wrapper__subtitle">{subtitle}</span>
				</div>

				<SignInForm isAdmin={isAdmin} />
			</div>

			<div className="sign-in-container__right-section">
				<Image
					src="/assets/images/logo_pixcoin.png"
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