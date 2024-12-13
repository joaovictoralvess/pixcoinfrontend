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
					Que alegria ter você conosco! É uma honra enorme apresentar a você a nova telemetria, feito com muito carinho
					para oferecer uma experiência ainda mais incrível.
				</p>

				<p>
					Estamos sempre buscando evoluir para melhor atendê-lo, e este é apenas o começo de uma jornada repleta de
					novidades. Navegue à vontade e conte com a gente para o que precisar!
				</p>

				<p>
					Seja bem-vindo(a) ao novo capítulo da nossa história.
				</p>

				<p>
					Abraços,
					Equipe Pixcoin
				</p>
			</div>

			<div className="wellcome-buttons">
				<Button onClick={() => setOpen(false)}>Fechar</Button>
				<Button onClick={handleCloseAndMarkNotShowAgain}>Fechar e não exibir novamente</Button>
			</div>
		</Modal>
	);
}
