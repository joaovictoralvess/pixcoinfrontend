import { Params } from '@/@types/params';

import Header from '@/app/customer/machine-panel/components/Header/Header';
import Layout from '@/app/customer/machine-panel/components/Layout/Layout';

export interface MachineDetailProps {
	params: Params
}

export default async function MachineDetail(props: MachineDetailProps) {
	const { id } = await props.params;
	return (
		<>
			<Header />
			<Layout>
				<h1>{id}</h1>
			</Layout>
		</>
	)
}