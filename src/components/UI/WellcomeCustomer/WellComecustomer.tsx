'use client';

import { useEffect, useState } from 'react';

import Button from '@/components/Forms/Button/Button';
import Modal from '@/components/UI/Modal/Modal';

export interface WellComeCustomerProps {
	name: string;
}

import './styles.scss';

export default function WellComeCustomer({ name }: WellComeCustomerProps) {
	const [open, setOpen] = useState(true);
	const [shouldShow, setShouldShow] = useState(false);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const showModal = sessionStorage.getItem('show-wellcome-modal');
			if (showModal !== '0') {
				setShouldShow(true);
			}
		}
	}, []);

	const handleCloseAndMarkNotShowAgain = () => {
		sessionStorage.setItem('show-wellcome-modal', '0');
		setOpen(false);
		setShouldShow(false);
	};

	if (!shouldShow || !open) {
		return null;
	}

	return (
		<Modal onClose={() => setOpen(!open)} title="Bem Vindo!">
			<div className="wellcome-text">
				<p>
					Olá, {name}!
				</p>

				<p>
					É de extrema importância que você entre em contato conosco para realizar a migração para o novo sistema.
				</p>

				<p>
					O novo sistema conta com diversas funcionalidades aprimoradas, além de correções de vários erros encontrados na versão atual.
				</p>

				<p>
					Em breve, o sistema atual será desligado e deixará de estar disponível.
				</p>

				<p>
					Para evitar qualquer interrupção no seu uso, entre em contato o quanto antes.
				</p>

				<p>
					Atenciosamente,<br />
					Equipe Pixcoin ❤️
				</p>
			</div>


			<div className="wellcome-buttons">
				<Button onClick={() => setOpen(false)}>Fechar</Button>
				<Button onClick={handleCloseAndMarkNotShowAgain}>Fechar e não exibir novamente</Button>
			</div>
		</Modal>
	);
}
