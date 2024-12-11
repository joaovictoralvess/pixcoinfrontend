import GoBackIcon from '@/components/Icons/GoBackIcon';
import Header from '@/components/UI/Header/Header';
import Layout from '@/components/UI/Layout/Layout';
import Machine from '@/components/UI/Machine/Machine';
import CustomerActions from '@/app/admin/customers/components/CustomerActions/CustomerActions';

import PageTitleWithSync from '@/components/UI/PageTitleWithSync/PageTitleWithSync';

import { Params } from '@/@types/params';

import AdminService from '@/services/Admin';

export interface AdminCustomerProps {
	params: Params;
}

import './styles.scss';

export default async function AdminCustomer(props: AdminCustomerProps) {
	const { id } = await props.params;
	const customer = await AdminService.customer(id);

	return (
		<>
			<Header iconLeft={
				<GoBackIcon goTo={`/admin/customers`} />
			}
			/>
			<main className='customer'>
				<Layout className='customer__container'>
					<div className='customer__container__wrapper-button'>
						<PageTitleWithSync updateTo={`/admin/customers/${id}`} title={customer.nome} />
						<CustomerActions customer={customer} shouldRender="edit-customer-and-add-machine" clientId={id} />
					</div>

					<div className='customer__container__wrapper-machines'>
						{customer.Maquina && customer.Maquina.length && customer.Maquina.map((machine) => (
							<Machine key={`${machine.id}`} machine={machine} />
						))}
					</div>
				</Layout>
			</main>
		</>
	)
}