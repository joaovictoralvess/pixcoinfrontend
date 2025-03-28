import { redirectAdminToLoginIfNotLogged } from '@/helpers/admin';
import { Params } from '@/@types/params';
import { SearchParams } from '@/@types/searchParams';
import { IMachine } from '@/interfaces/IMachine';

import Header from '@/components/UI/Header/Header';
import GoBackIcon from '@/components/Icons/GoBackIcon';
import Layout from '@/components/UI/Layout/Layout';
import PageTitleWithSync from '@/components/UI/PageTitleWithSync/PageTitleWithSync';
import MachineActions from '@/app/customer/machine-panel/components/MachineActions/MachineActions';
import PaymentReport from '@/components/UI/PaymentReport/PaymentReport';
import PaymentTable from '@/app/customer/machine-panel/components/PaymentTable/PaymentTable';

export interface CustomerPaymentsProps {
	params: Params;
	searchParams: SearchParams;
}

import { IPaymentResponse } from '@/interfaces/IPayment';

import transformPaymentsData, { removeDuplicateMP } from '@/helpers/payment';
import AdminService from '@/services/Admin';

import { getSession } from '@/helpers/session';
import { User } from '@/interfaces/User';

import './styles.scss';


export default async function CustomerPayments(props: CustomerPaymentsProps) {
	await redirectAdminToLoginIfNotLogged();

	const user = await getSession() as User;

	const { machineId } = await props.params;
	const { id } = await props.params;
	const searchParams = await props.searchParams;

	const startDate = searchParams?.startDate || '';
	const endDate = searchParams?.endDate || '';
	const machineName = String(searchParams?.machineName) || '';

	const resolveFetchPayments = async (): Promise<IPaymentResponse> => {
		if (startDate !== '' && endDate !== '') {
			const newEndDate = new Date(`${endDate}`);
			newEndDate.setUTCHours(23, 59, 0, 0);

			return await AdminService.paymentsByPeriod(machineId, {
				dataInicio: `${startDate}`,
				dataFim: `${newEndDate.toISOString()}`,
			});
		}

		return await AdminService.payments(machineId);
	}

	const data = await resolveFetchPayments();
	const tableData = transformPaymentsData(removeDuplicateMP(data.pagamentos));

	return (
		<>
			<Header iconLeft={
				<GoBackIcon goTo={`/admin/customers/${id}`} />
			}
			/>

			<main className='customer-payments-panel'>
				<Layout className="customer-payments-panel__container">
					<h4 className='customer-payments-panel__container__selected-machine'>Máquina selecionada: {machineName}</h4>
					<div className='customer-payments-panel__container__wrapper-buttons'>
						<PageTitleWithSync updateTo={`/admin/customers/${id}/machine/${machineId}?machineName=${machineName}`} title='Painel de pagamentos' />
						<MachineActions user={user} isAdmin={true} machine={{ id: machineId } as IMachine} shouldRender='delete-only' />
						<PaymentReport canDelete={!!user.canDeletePayments && !!user.employee} machineName={machineName} isAdmin={true} customerId={id} machineId={machineId} />
					</div>

					<PaymentTable tableData={tableData} />
				</Layout>
			</main>
		</>
	)
}