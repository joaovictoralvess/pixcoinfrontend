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
		<Modal onClose={() => setOpen(!open)} title="Aviso!">
			<div className="wellcome-text">
				<p>
					Olá {name} <br/>
					Informamos que o Mercado Pago está passando por instabilidades momentâneas, o que pode ocasionar lentidão em operações de estorno e na computação de créditos.
				</p>
				<p>
					Reforçamos que essa situação é externa e não se trata de um problema da Pixcoin. Estamos acompanhando de perto e à disposição para ajudar no que for necessário.
				</p>
				<p>
					Abraços,
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
