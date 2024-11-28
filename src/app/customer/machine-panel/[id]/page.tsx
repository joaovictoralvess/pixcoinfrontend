import { Params } from '@/@types/params';
import Header from '@/app/customer/machine-panel/components/Header/Header';

export interface MachineDetailProps {
	params: Params
}

export default async function MachineDetail(props: MachineDetailProps) {
	const { id } = await props.params;
	return (
		<>
			<Header />
			<h1>{id}</h1>
		</>
	)
}