import './styles.scss'

export interface TableData {
	date: string;
	paymentForm: string;
	value: string;
	identifierMP: string | number,
	reversed: 'Recebido' | 'Estornado';
	reason?: string;
}

export interface TableProps {
	tableData: TableData[]
}

export default function PaymentTable({ tableData }: TableProps) {
	return (
		<div className='table-container'>
			<table className='table-container__table'>
				<thead>
				<tr>
					<th>Data</th>
					<th>Forma de pagamento</th>
					<th>Valor</th>
					<th>IdentificadorMP</th>
					<th>Estornado</th>
				</tr>
				</thead>
				<tbody>
				{tableData.map((dado, index) => (
					<tr key={index}>
						<td>{dado.date}</td>
						<td>{dado.paymentForm}</td>
						<td>{dado.value}</td>
						<td>{dado.identifierMP}</td>
						<td>
							{dado.reversed === 'Recebido' ? (
								<span className='receive'>{dado.reversed}</span>
							) : (
								<span className='reversed' title={dado.reason && dado.reason}>{dado.reversed}</span>
							)}
						</td>
					</tr>
				))}
				</tbody>
			</table>
		</div>
	);
}
