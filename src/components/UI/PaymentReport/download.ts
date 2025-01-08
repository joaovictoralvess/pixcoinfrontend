'use server';

import { DownloadReportRequest } from '@/interfaces/Report';
import ReportService from '@/services/Report';

export const downloadReport = async (data: DownloadReportRequest) => {
	return await ReportService.downloadReport(data);
}