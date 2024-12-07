import Header from '@/components/UI/Header/Header';
import Layout from '@/components/UI/Layout/Layout';
import PageTitleWithSync from '@/components/UI/PageTitleWithSync/PageTitleWithSync';

import AddCustomerButton from '@/app/admin/customers/components/AddMoreCustomer/AddCustomerButton/AddCustomerButton';
import CustomerCard from '@/app/admin/customers/components/CustomerCard/CustomerCard';

import './styles.scss';


export default function AdminCustomers() {
	return (
		<>
			<Header />
			<main className='customers'>
				<Layout className='customers__container'>
					<div className='customers__container__wrapper-button'>
						<PageTitleWithSync updateTo='/admin/customers' title='Painel de clientes' />
						<AddCustomerButton />
					</div>
				</Layout>

				<div className='customers__container__wrapper-customers'>
					<CustomerCard />
				</div>
			</main>
		</>
	)
}