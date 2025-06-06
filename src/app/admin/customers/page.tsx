import Header from '@/components/UI/Header/Header';
import Layout from '@/components/UI/Layout/Layout';
import PageTitleWithSync from '@/components/UI/PageTitleWithSync/PageTitleWithSync';

import AdminService from '@/services/Admin';

import CustomersWithSearch from '@/app/admin/customers/components/CustomersWithSearch/CustomersWithSearch';

import CustomerActions from '@/app/admin/customers/components/CustomerActions/CustomerActions';

import { redirectAdminToLoginIfNotLogged } from '@/helpers/admin';

import './styles.scss';

export default async function AdminCustomers() {
	await redirectAdminToLoginIfNotLogged();

	const customers = await AdminService.allCustomers();

	return (
		<>
			<Header />
			<main className='customers'>
				<Layout className='customers__container'>
					<div className='customers__container__wrapper-button'>
						<PageTitleWithSync updateTo='/admin/customers' title='Painel de clientes' />
						<CustomerActions shouldRender='new-customer' />
					</div>
				</Layout>

				<CustomersWithSearch customers={customers} />
			</main>
		</>
	)
}