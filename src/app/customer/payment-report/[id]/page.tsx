import { SearchParams } from '@/@types/searchParams';
import { Params } from '@/@types/params';

import PageTitleWithSync from '@/components/UI/PageTitleWithSync/PageTitleWithSync';
import Header from '@/components/UI/Header/Header';
import Layout from '@/components/UI/Layout/Layout';

import GoBackIcon from '@/components/Icons/GoBackIcon';
import PaymentCharts from '@/app/customer/payment-report/components/PaymentCharts/PaymentCharts';

import { redirectCustomerToLoginIfNotLogged } from '@/helpers/customer';
import { formatToBRL, retrieveDate, retrieveFormattedDate } from '@/helpers/payment';

import ReportService from '@/services/Report';

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
	const newEndDate = new Date(endDate);

	newEndDate.setUTCHours(23, 59, 0, 0);

	const {
		payments,
		tax,
		reverses,
		money
	}  = await ReportService.allReports({
		dataInicio: startDate,
		dataFim: newEndDate.toISOString(),
		maquinaId: id,
	});

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
							Gerado em {retrieveFormattedDate(new Date().toISOString(), false)}
						</span>
					</div>

					<div className='payment-report-screen__graph'>
						<div className="payment-report-screen__graph__data">
							<div className="payment-report-screen__graph__data__tax">
								<h2>TAXAS</h2>
								<span>PIX - {formatToBRL(`${tax.pix}`)}</span>
								<span>CRÉDITO - {formatToBRL(`${tax.credito}`)}</span>
								<span>DÉBITO - {formatToBRL(`${tax.debito}`)}</span>
							</div>
							<h2>Total de estornos - {formatToBRL(`${reverses.valor}`)}</h2>
						</div>

						<PaymentCharts
							labels={['PIX', 'ESPÉCIE', 'CRÉDITO', 'DÉBITO']}
							values={[payments.pix, money.valor, payments.credito, payments.debito]}
						/>
					</div>

				</Layout>
			</main>
		</>
	)
};