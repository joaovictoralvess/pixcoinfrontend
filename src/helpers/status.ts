export function verificarStatusPagamento(data: string): 'REGULAR' | 'INADIMPLENTE' {
	const dataVencimento = new Date(data);

	if (isNaN(dataVencimento.getTime())) {
		throw new Error('Data de vencimento inválida');
	}

	const hoje = new Date();
	const diffDias = Math.floor((hoje.getTime() - dataVencimento.getTime()) / (1000 * 60 * 60 * 24));

	return diffDias > 10 ? 'INADIMPLENTE' : 'REGULAR';
}