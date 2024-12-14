'use client';

import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

export interface PaymentChartsProps {
	labels: string[];
	values: number[];
}

export default function PaymentCharts({ labels, values }: PaymentChartsProps) {
	Chart.register(...registerables);
	const paymentsRef = useRef<HTMLCanvasElement | null>(null);
	const chartInstance = useRef<Chart | null>(null);

	useEffect(() => {
		const ctx = paymentsRef.current?.getContext('2d');

		if (chartInstance.current) {
			chartInstance.current.destroy();
		}

		if (ctx) {
			chartInstance.current = new Chart(ctx, {
				type: 'pie',
				data: {
					labels,
					datasets: [
						{
							label: 'Pagamentos',
							data: values,
							backgroundColor: [
								'#162778',
								'#df79c3',
								'#e2e5f8',
								'#fbdddd',
							],
							borderWidth: 1,
						},
					],
				},
				options: {
					responsive: true,
					plugins: {
						legend: {
							position: 'top',
						},
						title: {
							display: true,
							text: 'Pagamentos',
						},
					},
				},
			});
		}

		// Cleanup na desmontagem do componente
		return () => {
			if (chartInstance.current) {
				chartInstance.current.destroy();
				chartInstance.current = null;
			}
		};
	}, [labels, values]); // Atualizar o gráfico sempre que labels ou values mudarem

	return (
		<div>
			<canvas style={{ marginRight: 'auto' }} width={500} height={500} ref={paymentsRef}></canvas>
		</div>
	);
}
