import Image from 'next/image';

import './styles.scss';
import SignInForm from '@/app/auth/customer/sign-in/SignInForm';

export default async function SignIn() {
	return (
		<div className='sign-in-container'>
			<div className='sign-in-container__left-section'>
				<div className='sign-in-container__left-section__title'>
					<Image
						src='/assets/images/login.svg'
						alt='Ícone de seta simbolizando login'
						width={24}
						height={24}
					/>
					<h1>Login</h1>
				</div>
				<span className='sign-in-container__left-section__subtitle'>Preencha com e-mail e senha.</span>

				<SignInForm />
			</div>

			<div className='sign-in-container__right-section'>
				<Image
					src='/assets/images/pixcoin_logo.png'
					alt='Logo Pixcoin'
					width={0}
					height={0}
					sizes="100vw"
					style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
				/>
			</div>
		</div>
	)
}