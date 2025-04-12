export interface AllReportRequest {
	dataFim: string;
	dataInicio: string;
	maquinaId: string;
}

export interface DownloadReportRequest {
	startDate: string;
	endDate: string;
	machineId: string;
}

export interface AllReportResponse {
	payments: {
		[key: string]: number;
	},
	reverses: {
		[key: string]: number;
	},
	tax: {
		[key: string]: number;
	},
	money: {
		[key: string]: number;
	},
	error?: string;
}

