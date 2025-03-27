import { ICustomer } from '@/interfaces/ICustomer';
import { retrieveDate } from '@/helpers/payment';

export interface CustomerCardProps {
	customer: ICustomer,
	isAdmin?: boolean,
}

import Link from 'next/link';

import './styles.scss';
import CustomerActions from '@/app/admin/customers/components/CustomerActions/CustomerActions';

export default function CustomerCard({ customer, isAdmin }: CustomerCardProps) {
	function verificarStatusPagamento(diaVencimento: string): string {
		const dataVencimento = new Date(diaVencimento);

		if (isNaN(dataVencimento.getTime())) {
			throw new Error('Data de vencimento inválida');
		}

		const hoje = new Date();
		const diferencaEmMilissegundos = hoje.getTime() - dataVencimento.getTime();
		const diferencaEmDias = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));

		return diferencaEmDias > 10 ? 'INADIMPLENTE' : 'REGULAR';
	}

	if (customer.is_employee && !isAdmin) {
		return (
			<div className='customer-card'>
				<div className='customer-card__customer'>
					<div className='customer-card__customer__data'>
						<h1>{customer.nome}</h1>
						<h3>{customer.email}</h3>
					</div>

					<div className='customer-card__customer__situation'>
						<CustomerActions customer={customer} shouldRender="delete-employee" />
					</div>
				</div>

				<div className='customer-card__dates'>
					<span>Data de inclusão: {retrieveDate(customer.data_inclusao)}</span>
					{customer.ultimoAcesso && (<span>Ultimo acesso: {retrieveDate(customer.ultimoAcesso)}</span>)}
				</div>
			</div>
		)
	}


	return (
		<Link href={`/admin/customers/${customer.id}`} className='customer-card'>
			<div className='customer-card__customer'>
				<div className='customer-card__customer__data'>
					<h1>{customer.nome}</h1>
					<h3>{customer.email}</h3>
					{customer.is_employee ? (<h1></h1>) : (<h3>Total de máquinas: {customer.maquinas.length}</h3>)}
				</div>

				<div className='customer-card__customer__situation'>
					{customer.is_employee ? (
						<h1>Funcionário de cliente</h1>
						) : (
							<>
								<h3>
									Situação: {verificarStatusPagamento(customer.dataVencimento)}
								</h3>
								<h3>
									Vencimento: {retrieveDate(customer.dataVencimento)}
								</h3>
							</>
					)}

				</div>
			</div>

			<div className='customer-card__dates'>
				<span>Data de inclusão: {retrieveDate(customer.data_inclusao)}</span>
				{customer.ultimoAcesso && (<span>Ultimo acesso: {retrieveDate(customer.ultimoAcesso)}</span>)}
			</div>
		</Link>
	)
}