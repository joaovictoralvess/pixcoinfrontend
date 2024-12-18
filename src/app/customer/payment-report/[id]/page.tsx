import { SearchParams } from '@/@types/searchParams';
import { Params } from '@/@types/params';

import PageTitleWithSync from '@/components/UI/PageTitleWithSync/PageTitleWithSync';
import Header from '@/components/UI/Header/Header';
import Layout from '@/components/UI/Layout/Layout';

import GoBackIcon from '@/components/Icons/GoBackIcon';
import PaymentCharts from '@/app/customer/payment-report/components/PaymentCharts/PaymentCharts';

import { redirectCustomerToLoginIfNotLogged } from '@/helpers/customer';
import { formatDateToDDMMYYYYHHMMSS, formatToBRL, retrieveDate } from '@/helpers/payment';

import ReportService from '@/services/Report';

export interface PaymentReportScreen {
	searchParams: SearchParams;
	params: Params
}

import './styles.scss';
import { getSession } from '@/helpers/session';
import { User } from '@/interfaces/User';

export default async function PaymentReportScreen(props: PaymentReportScreen) {
	await redirectCustomerToLoginIfNotLogged();

	const user = await getSession() as User;
	const isADMIN = user.key === 'ADMIN';

	const { id } = await props.params;
	const searchParams = await props.searchParams;

	const startDate = String(searchParams?.startDate) || '';
	const endDate = String(searchParams?.endDate) || '';
	const newEndDate = new Date(endDate);

	const machineName = String(searchParams?.machineName) || '';

	const customerId = String(searchParams?.customerId) || '';

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

	const resolveGoBackPath = (): string => {
		if (isADMIN) {
			return `/admin/customers/${customerId}/machine/${id}?machineName=${machineName}`;
		}

		return `/customer/machine-panel/${id}?machineName=${machineName}`;
	}

	const resolveUpdatePath = (): string => {
		if (isADMIN) {
			return `/customer/payment-report/${id}?startDate=${startDate}&endDate=${endDate}&customerId=${customerId}`;
		}

		return `/customer/payment-report/${id}?startDate=${startDate}&endDate=${endDate}`
	}

	return (
		<>
			<Header iconLeft={
				<GoBackIcon goTo={resolveGoBackPath()} />
			}
			/>

			<main className='payment-report-screen'>
				<Layout>
					<PageTitleWithSync
						updateTo={resolveUpdatePath()}
						title='Relatório de pagamento'
					/>
					<div className='payment-report-screen__dates'>
						<span className='payment-report-screen__dates__range'>
							{retrieveDate(startDate)} - {retrieveDate(endDate)}
						</span>

						<span className='payment-report-screen__dates__generate-in'>
							Gerado em {formatDateToDDMMYYYYHHMMSS(new Date())}
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