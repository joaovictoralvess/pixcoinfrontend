import GoBackIcon from '@/components/Icons/GoBackIcon';
import Header from '@/components/UI/Header/Header';
import Layout from '@/components/UI/Layout/Layout';
import Machine from '@/components/UI/Machine/Machine';
import CustomerActions from '@/app/admin/customers/components/CustomerActions/CustomerActions';

import PageTitleWithSync from '@/components/UI/PageTitleWithSync/PageTitleWithSync';
import ErrorScreen from '@/components/UI/ErrorStatus/ErrorStatus';

import { ICustomer } from '@/interfaces/ICustomer';

import { Params } from '@/@types/params';

import AdminService from '@/services/Admin';

export interface AdminCustomerProps {
	params: Params;
}

import { redirectAdminToLoginIfNotLogged } from '@/helpers/admin';

import './styles.scss';

export default async function AdminCustomer(
	props: Readonly<AdminCustomerProps>
) {
	const user = await redirectAdminToLoginIfNotLogged();
	const isADMIN = user.key === 'ADMIN';

	const { id } = await props.params;
	const data = await AdminService.customer(id);

	if (data.error) {
		return (
			<ErrorScreen />
		)
	}

	const customer = data as ICustomer;

	return (
		<>
			<Header iconLeft={<GoBackIcon goTo={`/admin/customers`} />} />
			<main className="customer">
				<Layout className="customer__container">
					<div className="customer__container__wrapper-button">
						<PageTitleWithSync title={customer.nome} />
						<CustomerActions
							isAdmin={isADMIN}
							customer={customer}
							shouldRender="edit-customer-and-add-machine-and-disabled-all-machines-add-warning"
							clientId={id}
						/>
					</div>

					{customer.maquinas.length > 0 ? (
						<div className="customer__container__wrapper-machines">
							{customer.maquinas &&
								customer.maquinas.length &&
								customer.maquinas.map((machine) => (
									<Machine
										user={user}
										customerId={customer.id}
										key={`${machine.id}`}
										machine={machine}
									/>
								))}
						</div>
					) : (
						<h2 style={{ marginTop: 40 }}>Cliente ainda não possui máquinas</h2>
					)}
				</Layout>
			</main>
		</>
	);
}
