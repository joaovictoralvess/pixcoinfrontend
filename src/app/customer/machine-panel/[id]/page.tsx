import { Params } from '@/@types/params';

import GoBackIcon from '@/components/Icons/GoBackIcon';
import Header from '@/app/customer/machine-panel/components/Header/Header';
import Layout from '@/app/customer/machine-panel/components/Layout/Layout';
import Table from '@/app/customer/machine-panel/components/Table/Table';
import transformPaymentsData from '@/app/customer/machine-panel/[id]/transformPaymentsData';

import MachineService from '@/services/Machine';

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
			<Layout>
				<Table tableData={tableData} />
			</Layout>
		</>
	)
}