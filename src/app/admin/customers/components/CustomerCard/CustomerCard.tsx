import './styles.scss';

export default function CustomerCard() {
	return (
		<div className='customer-card'>
			<div className='customer-card__customer'>
				<div className='customer-card__customer__data'>
					<h1>NOME DO CLIENTE</h1>
					<span>Email do cliente</span>
					<span>Máquinas</span>
				</div>

				<div className='customer-card__customer__situation'>
					<h3>
						Situação <span>Regular</span>
					</h3>
					<h3>
						Vencimento <span>26/11/2032</span>
					</h3>
				</div>
			</div>

			<div className='customer-card__dates'>
				<span>Data de inclusão: 26/11/2023</span>
				<span>Ultimo acesso: 25/11/2323</span>
			</div>
		</div>
	)
}