import { Params } from '@/@types/params';

import GoBackIcon from '@/components/Icons/GoBackIcon';
import EditIcon from '@/components/Icons/EditIcon';

import Header from '@/app/customer/machine-panel/components/Header/Header';
import Layout from '@/app/customer/machine-panel/components/Layout/Layout';
import PageTitleWithSync from '@/app/customer/machine-panel/components/PageTitleWithSync/PageTitleWithSync';

import ActionButton from '@/app/customer/machine-panel/components/ActionButton/ActionButton';
import PaymentTable from '@/app/customer/machine-panel/components/PaymentTable/PaymentTable';
import transformPaymentsData from '@/helpers/payment';

import { redirectCustomerToLoginIfNotLogged } from '@/helpers/customer';

import MachineService from '@/services/Machine';

import './styles.scss';

export interface MachineDetailProps {
	params: Params
}

export default async function MachineDetail(props: MachineDetailProps) {
	await redirectCustomerToLoginIfNotLogged()

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
						<ActionButton
							className='payments-panel__container__wrapper-buttons__edit'
							updateTo='/'
							icon={<EditIcon width={10} height={10} />}
						>
							Editar
						</ActionButton>
					</div>

					<PaymentTable tableData={tableData} />
				</Layout>
			</main>
		</>
	)
}