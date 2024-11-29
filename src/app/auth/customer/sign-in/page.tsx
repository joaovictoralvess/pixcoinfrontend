import Image from 'next/image';

import './styles.scss';
import SignInForm from '@/app/auth/customer/sign-in/SignInForm';
import LoginIcon from '@/components/Icons/LoginIcon';

export default async function SignIn() {
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

				<SignInForm />
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