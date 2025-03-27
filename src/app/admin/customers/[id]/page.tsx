import GoBackIcon from '@/components/Icons/GoBackIcon';
import Header from '@/components/UI/Header/Header';
import Layout from '@/components/UI/Layout/Layout';
import Machine from '@/components/UI/Machine/Machine';
import CustomerActions from '@/app/admin/customers/components/CustomerActions/CustomerActions';

import PageTitleWithSync from '@/components/UI/PageTitleWithSync/PageTitleWithSync';

import { Params } from '@/@types/params';

import { getSession } from '@/helpers/session';
import { User } from '@/interfaces/User';

import AdminService from '@/services/Admin';

export interface AdminCustomerProps {
	params: Params;
}

import { redirectAdminToLoginIfNotLogged } from '@/helpers/admin';

import './styles.scss';


export default async function AdminCustomer(props: AdminCustomerProps) {
	await redirectAdminToLoginIfNotLogged();

	const user = await getSession() as User;
	const isADMIN = user.key === 'ADMIN';

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
						<CustomerActions isAdmin={isADMIN} customer={customer} shouldRender="edit-customer-and-add-machine-and-disabled-all-machines-add-warning" clientId={id} />
					</div>

					{customer.maquinas.length > 0 ? (
						<div className='customer__container__wrapper-machines'>
							{customer.maquinas && customer.maquinas.length && customer.maquinas.map((machine) => (
								<Machine customerId={customer.id} key={`${machine.id}`} machine={machine} />
							))}
						</div>
					) : (
						<h2 style={{marginTop: 40}}>Cliente ainda não possui máquinas</h2>
					)}
				</Layout>
			</main>
		</>
	)
}