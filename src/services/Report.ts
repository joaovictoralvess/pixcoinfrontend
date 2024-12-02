import { getSession } from '@/helpers/session';

import { User } from '@/interfaces/User';
import { AllReportRequest, AllReportResponse } from '@/interfaces/Report';

const ReportService = {
	allReports: async (data: AllReportRequest): Promise<AllReportResponse> => {
	const user = await getSession() as User;

	const requests = [
		fetch(`${process.env.REACT_APP_SERVIDOR}/relatorio-03-pagamentos`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"x-access-token": user.token
			},
			body: JSON.stringify(data)
		}),
		fetch(`${process.env.REACT_APP_SERVIDOR}/relatorio-04-estornos`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"x-access-token": user.token
			},
			body: JSON.stringify(data)
		}),
		fetch(`${process.env.REACT_APP_SERVIDOR}/relatorio-02-taxas`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"x-access-token": user.token
			},
			body: JSON.stringify(data)
		}),
		fetch(`${process.env.REACT_APP_SERVIDOR}/relatorio-01-cash`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"x-access-token": user.token
			},
			body: JSON.stringify(data)
		})
	];

		const responses = await Promise.all(requests);
		return {
			payments: await responses[0].json(),
			reverses: await responses[1].json(),
			tax: await responses[2].json(),
			money: await responses[3].json()
		}
	}
}

export default ReportService;