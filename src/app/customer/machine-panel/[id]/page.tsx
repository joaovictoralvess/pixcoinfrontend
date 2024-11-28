import { Params } from '@/@types/params';

import GoBackIcon from '@/components/Icons/GoBackIcon';
import Header from '@/app/customer/machine-panel/components/Header/Header';
import Layout from '@/app/customer/machine-panel/components/Layout/Layout';
import Table from '@/app/customer/machine-panel/components/Table/Table';

import transformPaymentsData from '@/helpers/transformPaymentsData';
import PageTitleWithSync from '@/app/customer/machine-panel/components/PageTitleWithSync/PageTitleWithSync';

import MachineService from '@/services/Machine';
import ActionButton from '@/app/customer/machine-panel/components/ActionButton/ActionButton';

import './styles.scss';
import EditIcon from '@/components/Icons/EditIcon';

export interface MachineDetailProps {
	params: Params
}

export default async function MachineDetail(props: MachineDetailProps) {
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

					<Table tableData={tableData} />
				</Layout>
			</main>
		</>
	)
}