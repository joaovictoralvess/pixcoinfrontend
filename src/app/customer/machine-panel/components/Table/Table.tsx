import './styles.scss'

export default function Table() {
	const dados = [
		{
			data: '2024-11-25',
			formaPagamento: 'Cartão de Crédito',
			valor: 'R$ 150,00',
			identificadorMP: '12345-ABCDE',
			estornado: 'Não',
		},
		{
			data: '2024-11-26',
			formaPagamento: 'Boleto Bancário',
			valor: 'R$ 200,00',
			identificadorMP: '67890-FGHIJ',
			estornado: 'Sim',
		},
		{
			data: '2024-11-27',
			formaPagamento: 'Pix',
			valor: 'R$ 300,00',
			identificadorMP: '11223-KLMNO',
			estornado: 'Não',
		},
		{
			data: '2024-11-27',
			formaPagamento: 'Pix',
			valor: 'R$ 300,00',
			identificadorMP: '11223-KLMNO',
			estornado: 'Não',
		},
		{
			data: '2024-11-27',
			formaPagamento: 'Pix',
			valor: 'R$ 300,00',
			identificadorMP: '11223-KLMNO',
			estornado: 'Não',
		},
		{
			data: '2024-11-27',
			formaPagamento: 'Pix',
			valor: 'R$ 300,00',
			identificadorMP: '11223-KLMNO',
			estornado: 'Não',
		},
		{
			data: '2024-11-27',
			formaPagamento: 'Pix',
			valor: 'R$ 300,00',
			identificadorMP: '11223-KLMNO',
			estornado: 'Não',
		},{
			data: '2024-11-27',
			formaPagamento: 'Pix',
			valor: 'R$ 300,00',
			identificadorMP: '11223-KLMNO',
			estornado: 'Não',
		},{
			data: '2024-11-27',
			formaPagamento: 'Pix',
			valor: 'R$ 300,00',
			identificadorMP: '11223-KLMNO',
			estornado: 'Não',
		},{
			data: '2024-11-27',
			formaPagamento: 'Pix',
			valor: 'R$ 300,00',
			identificadorMP: '11223-KLMNO',
			estornado: 'Não',
		},
	];

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
				{dados.map((dado, index) => (
					<tr key={index}>
						<td>{dado.data}</td>
						<td>{dado.formaPagamento}</td>
						<td>{dado.valor}</td>
						<td>{dado.identificadorMP}</td>
						<td>{dado.estornado}</td>
					</tr>
				))}
				</tbody>
			</table>
		</div>
	);
}
