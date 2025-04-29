import Image from 'next/image';

import ForgotPasswordForm from '@/app/auth/forgot-password/components/ForgotPasswordForm/ForgotPasswordForm';

import './styles.scss';

export default async function ForgotPasswordPage() {
	return (
		<div className="forgot-password-container">
			<div className="forgot-password-container__left-section">
				<div className="forgot-password-container__left-section__wrapper">
					<div className="forgot-password-container__left-section__wrapper__title">
						<h1>Esqueci minha senha</h1>
					</div>
					<span className="forgot-password-container__left-section__wrapper__subtitle">
						Recupere sua conta aqui!
					</span>
				</div>

				<ForgotPasswordForm />
			</div>

			<div className="forgot-password-container__right-section">
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
	);
}
