import { ICustomer } from '@/interfaces/ICustomer';
import { retrieveDate } from '@/helpers/payment';

export interface CustomerCardProps {
	customer: ICustomer
}

import './styles.scss';
import Link from 'next/link';

export default function CustomerCard({ customer }: CustomerCardProps) {
	return (
		<Link href={`/admin/customers/${customer.id}`} className='customer-card'>
			<div className='customer-card__customer'>
				<div className='customer-card__customer__data'>
					<h1>{customer.nome}</h1>
					<h3>{customer.email}</h3>
					<h3>Total de máquinas: {customer.Maquina.length}</h3>
				</div>

				<div className='customer-card__customer__situation'>
					<h3>
						Situação: Regular
					</h3>
					<h3>
						Vencimento: {retrieveDate(customer.dataVencimento)}
					</h3>
				</div>
			</div>

			<div className='customer-card__dates'>
				<span>Data de inclusão: {retrieveDate(customer.dataInclusao)}</span>
				{customer.ultimoAcesso && (<span>Ultimo acesso: {retrieveDate(customer.ultimoAcesso)}</span>)}
			</div>
		</Link>
	)
}