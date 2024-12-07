import GoBackIcon from '@/components/Icons/GoBackIcon';
import Header from '@/components/UI/Header/Header';
import Layout from '@/components/UI/Layout/Layout';
import PageTitleWithSync from '@/components/UI/PageTitleWithSync/PageTitleWithSync';

import CustomerActions from '@/app/admin/customers/components/AddMoreCustomer/CustomerActions/CustomerActions';

import { Params } from '@/@types/params';

import AdminService from '@/services/Admin';

export interface AdminCustomerProps {
	params: Params;
}

import './styles.scss';
import Machine from '@/app/customer/machine-panel/components/Machine/Machine';

export default async function AdminCustomer(props: AdminCustomerProps) {
	const { id } = await props.params;
	const customer = await AdminService.customer(id);
	console.log(customer);

	return (
		<>
			<Header iconLeft={
				<GoBackIcon goTo={`/admin/customers`} />
			}
			/>
			<main className='customer'>
				<Layout className='customer__container'>
					<div className='customer__container__wrapper-button'>
						<PageTitleWithSync updateTo={`/admin/customers/${id}`} title='Cliente XPTO' />
						<CustomerActions />
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