import Header from '@/components/UI/Header/Header';
import Layout from '@/components/UI/Layout/Layout';
import PageTitleWithSync from '@/components/UI/PageTitleWithSync/PageTitleWithSync';
import GoBackIcon from '@/components/Icons/GoBackIcon';

import CustomersWithSearch from '@/app/admin/customers/components/CustomersWithSearch/CustomersWithSearch';
import ErrorScreen from '@/components/UI/ErrorStatus/ErrorStatus';

import { redirectCustomerToLoginIfNotLogged } from '@/helpers/customer';

import CustomersService from '@/services/Customers';

import './styles.scss';

export default async function Employees() {
	const user = await redirectCustomerToLoginIfNotLogged();

	const customers = await CustomersService.getEmployees(user.id, user.token);

	if (!Array.isArray(customers)) {
		return (
			<ErrorScreen />
		);
	}

	return (
		<>
			<Header iconLeft={
				<GoBackIcon goTo={`/customer/machine-panel`} />
			} />

			<main className='customers'>
				<Layout className='customers__container'>
					<div className='customers__container__wrapper-button'>
						<PageTitleWithSync title='Listagem de Usuários' />
					</div>
				</Layout>

				{customers.length > 0 ? (
					<CustomersWithSearch customers={customers} />
				) : (<h1>Nenhum Usuário cadastrado</h1>)}
			</main>
		</>
	)
}