'use client';

import { useTransition } from 'react';

import { ICustomer } from '@/interfaces/ICustomer';
import { retrieveDate } from '@/helpers/payment';
import { verificarStatusPagamento } from '@/helpers/status';
import { useRouter } from 'next/navigation';

import CustomerActions from '@/app/admin/customers/components/CustomerActions/CustomerActions';

export interface CustomerCardProps {
	customer: ICustomer;
	isAdmin?: boolean;
}

import './styles.scss';
import Loading from '@/components/UI/Loading/Loading';

export default function CustomerCard({ customer, isAdmin }: Readonly<CustomerCardProps>) {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const handleCardClick = () => {
		startTransition(() => {
			router.push(`/admin/customers/${customer.id}`)
		});
	};

	if (customer.is_employee && !isAdmin) {
		return (
			<div className="customer-card">
				<div className="customer-card__customer">
					<div className="customer-card__customer__data">
						<h1>{customer.nome}</h1>
						<h3>{customer.email}</h3>
					</div>
					<div className="customer-card__customer__situation">
						<CustomerActions
							customer={customer}
							shouldRender="delete-employee"
						/>
					</div>
				</div>
				<CustomerDates customer={customer} />

				{isPending && (
					<Loading useInRoot />
				)}
			</div>
		);
	}

	return (
		<div
			className="customer-card"
			onClick={handleCardClick}
			role="button"
			tabIndex={0}
			onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
		>
			<div className="customer-card__customer">
				<div className="customer-card__customer__data">
					<h1>{customer.nome}</h1>
					<h3>{customer.email}</h3>
					{!customer.is_employee && (
						<h3>Total de máquinas: {customer.maquinas.length}</h3>
					)}
				</div>

				<div className="customer-card__customer__situation">
					{customer.is_employee ? (
						<h3>Funcionário de cliente</h3>
					) : (
						<>
							<h3>
								Situação: {verificarStatusPagamento(customer.dataVencimento)}
							</h3>
							<h3>Vencimento: {retrieveDate(customer.dataVencimento)}</h3>
							{customer?.cellphone && (
								<h3>Celular: {customer.cellphone}</h3>
							)}
						</>
					)}
				</div>
			</div>

			<CustomerDates customer={customer} />
			{isPending && (
				<Loading useInRoot />
			)}
		</div>
	);
}

function CustomerDates({ customer }: Readonly<{ customer: ICustomer }>) {
	return (
		<div className="customer-card__dates">
			<span>Data de inclusão: {retrieveDate(customer.data_inclusao)}</span>
			{customer.ultimoAcesso && (
				<span>Ultimo acesso: {retrieveDate(customer.ultimoAcesso)}</span>
			)}
		</div>
	);
}
