import { createPortal } from 'react-dom';
import { HTMLAttributes, useEffect, useState } from 'react';

import './styles.scss';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
	onClose: () => void;
	id?: string;
	title: string;
}

export default function Modal({ children, onClose, title, id = 'modal', ...rest }: ModalProps) {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
		return () => setIsMounted(false);
	}, []);

	if (!isMounted) {
		return null;
	}

	const handleOutsideClick = (e: any) => {
		if (e.target.id === id) {
			onClose();
		}
	}

	const modalContent = (
		<div id={id} className='modal' onClick={handleOutsideClick} {...rest}>
			<div className='modal__container'>
				<div className='modal__container__header'>
					<button title='Fechar modal' onClick={onClose} className="modal__container__header__close" />
					<h1 className="modal__container__header__title">{title}</h1>
				</div>

				<div className="modal__container__content">{children}</div>
			</div>
		</div>
	);

	return createPortal(
		modalContent,
		document.getElementById('modal-root')!
	);
}