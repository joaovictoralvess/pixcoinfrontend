import { SearchParams } from '@/@types/searchParams';
import { Params } from '@/@types/params';

import PageTitleWithSync from '@/app/customer/machine-panel/components/PageTitleWithSync/PageTitleWithSync';
import GoBackIcon from '@/components/Icons/GoBackIcon';
import Header from '@/app/customer/machine-panel/components/Header/Header';
import Layout from '@/app/customer/machine-panel/components/Layout/Layout';

import { redirectCustomerToLoginIfNotLogged } from '@/helpers/customer';
import { retrieveDate, retrieveFormattedDate } from '@/helpers/payment';

export interface PaymentReportScreen {
	searchParams: SearchParams;
	params: Params
}

import './styles.scss';

export default async function PaymentReportScreen(props: PaymentReportScreen) {
	await redirectCustomerToLoginIfNotLogged();

	const { id } = await props.params;
	const searchParams = await props.searchParams;

	const startDate = String(searchParams?.startDate) || '';
	const endDate = String(searchParams?.endDate) || '';

	return (
		<>
			<Header iconLeft={
				<GoBackIcon goTo={`/customer/machine-panel/${id}`} />
			}
			/>

			<main className='payment-report-screen'>
				<Layout>
					<PageTitleWithSync
						updateTo={`/customer/payment-report/${id}?startDate=${startDate}&endDate=${endDate}`}
						title='Relatório de pagamento'
					/>
					<div className='payment-report-screen__dates'>
						<span className='payment-report-screen__dates__range'>
							{retrieveDate(startDate)} - {retrieveDate(endDate)}
						</span>

						<span className='payment-report-screen__dates__generate-in'>
							Gerado em {retrieveFormattedDate(new Date().toISOString())}
						</span>
					</div>
				</Layout>
			</main>
		</>
	)
};