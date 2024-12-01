import { Params } from '@/@types/params';

import GoBackIcon from '@/components/Icons/GoBackIcon';

import { IMachine } from '@/interfaces/IMachine';

import Header from '@/app/customer/machine-panel/components/Header/Header';
import Layout from '@/app/customer/machine-panel/components/Layout/Layout';
import MachineActions from '@/app/customer/machine-panel/components/MachineActions/MachineActions';
import PageTitleWithSync from '@/app/customer/machine-panel/components/PageTitleWithSync/PageTitleWithSync';
import PaymentReport from '@/components/UI/PaymentReport/PaymentReport';

import PaymentTable from '@/app/customer/machine-panel/components/PaymentTable/PaymentTable';
import transformPaymentsData from '@/helpers/payment';

import { redirectCustomerToLoginIfNotLogged } from '@/helpers/customer';

import MachineService from '@/services/Machine';

import './styles.scss';

export interface MachineDetailProps {
	params: Params
}

export default async function MachineDetail(props: MachineDetailProps) {
	await redirectCustomerToLoginIfNotLogged();

	const { id } = await props.params;

	const data = await MachineService.payments(id);
	const tableData = transformPaymentsData(data.pagamentos);

	return (
		<>
			<Header iconLeft={
				<GoBackIcon goTo="/customer/machine-panel" />
				}
			/>

			<main className='payments-panel'>
				<Layout className="payments-panel__container">
					<div className='payments-panel__container__wrapper-buttons'>
						<PageTitleWithSync updateTo={`/customer/machine-panel/${id}`} title='Painel de pagamentos' />
						<MachineActions machine={{ id } as IMachine} shouldRender='delete-only' />
						<PaymentReport machineId={id} />
					</div>

					<PaymentTable tableData={tableData} />
				</Layout>
			</main>
		</>
	)
}