import { Params } from '@/@types/params';
import { SearchParams } from '@/@types/searchParams';

import GoBackIcon from '@/components/Icons/GoBackIcon';

import { IMachine } from '@/interfaces/IMachine';
import { IPaymentResponse } from '@/interfaces/IPayment';

import MachineActions from '@/app/customer/machine-panel/components/MachineActions/MachineActions';

import PaymentReport from '@/components/UI/PaymentReport/PaymentReport';
import PageTitleWithSync from '@/components/UI/PageTitleWithSync/PageTitleWithSync';
import Header from '@/components/UI/Header/Header';
import Layout from '@/components/UI/Layout/Layout';

import PaymentTable from '@/app/customer/machine-panel/components/PaymentTable/PaymentTable';
import transformPaymentsData, { removeDuplicateMP } from '@/helpers/payment';

import { redirectCustomerToLoginIfNotLogged } from '@/helpers/customer';

import MachineService from '@/services/Machine';

import { getSession } from '@/helpers/session';
import { User } from '@/interfaces/User';

import './styles.scss';

export interface MachineDetailProps {
	params: Params;
	searchParams: SearchParams;
}

export default async function MachineDetail(props: Readonly<MachineDetailProps>) {
	await redirectCustomerToLoginIfNotLogged();

	const user = (await getSession()) as User;

	const { id } = await props.params;
	const searchParams = await props.searchParams;

	const startDate = searchParams?.startDate || '';
	const endDate = searchParams?.endDate || '';
	const machineName = String(searchParams?.machineName) || '';

	const resolveFetchPayments = async (): Promise<IPaymentResponse> => {
		if (startDate !== '' && endDate !== '') {
			const newEndDate = new Date(`${endDate}`);
			newEndDate.setUTCHours(23, 59, 0, 0);
			return await MachineService.paymentsByPeriod(id, {
				dataInicio: `${startDate}`,
				dataFim: `${newEndDate.toISOString()}`,
			});
		}

		return await MachineService.payments(id);
	};

	const data = await resolveFetchPayments();
	const tableData = transformPaymentsData(removeDuplicateMP(data.pagamentos));

	return (
		<>
			<Header iconLeft={<GoBackIcon goTo="/customer/machine-panel" />} />

			<main className="payments-panel">
				<Layout className="payments-panel__container">
					<h4 className="payments-panel__container__selected-machine">
						Máquina selecionada: {machineName}
					</h4>
					<div className="payments-panel__container__wrapper-buttons">
						<PageTitleWithSync title="Painel de pagamentos" />
						<MachineActions
							user={user}
							machine={{ id } as IMachine}
							shouldRender="delete-only"
						/>
						<PaymentReport
							canDelete={!!user.canDeletePayments}
							machineName={machineName}
							machineId={id}
						/>
					</div>

					<PaymentTable tableData={tableData} />
				</Layout>
			</main>
		</>
	);
}