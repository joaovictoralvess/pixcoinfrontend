import Header from '@/components/UI/Header/Header';
import Layout from '@/components/UI/Layout/Layout';
import PageTitleWithSync from '@/components/UI/PageTitleWithSync/PageTitleWithSync';
import Machine from '@/components/UI/Machine/Machine';

import { redirectCustomerToLoginIfNotLogged } from '@/helpers/customer';

import MachineService from '@/services/Machine';

import './styles.scss';

export default async function MachinePanel() {
	await redirectCustomerToLoginIfNotLogged()

	const machines = await MachineService.all();
	const machinesDisabled = machines.every(machine => machine.disabled);

	const renderContent = () => {
		if (machinesDisabled) {
			return (
				<div className="machine-panel__container__disabled-machine">
					<p>Informamos que as máquinas vinculadas ao seu cadastro foram desabilitadas devido à pendência de pagamento.
						Por favor, regularize sua situação para reativar os serviços. 😉</p>
				</div>
			);
		}

		if (machines.length === 0) {
			return (
				<h1>Nenhuma máquina encontrada...</h1>
			)
		}

		return (
			<>
				<p className='machine-panel__tip'>Selecione uma máquina para ver mais detalhes</p>

				<div className="warning">
					<div className="warning__header">Prezado(a) Cliente</div>
					<div className="warning__content">
						Informamos que foi enviado para cada cliente um link de cobrança referente à taxa de manutenção do
						servidor <span className="highlight">PIXcoin</span>. Esse link foi enviado pelo aplicativo InfinitePay,
						através do número de WhatsApp cadastrado por você.<br /><br />
						Caso o pagamento não seja efetuado até a data de vencimento, o serviço será automaticamente
						interrompido.<br /><br />
						Se o pagamento já foi realizado, por favor, desconsidere este aviso.
					</div>
					<div className="warning__footer">
						Atenciosamente,<br />
						Equipe PIXcoin
					</div>
				</div>

				{machines && machines.length && machines.map((machine) => (
					<div key={`${machine.id}`} className="machine-panel__container__wrapper-machines">
						<Machine machine={machine} />
					</div>
				))}
			</>
		)
	}

	return (
		<>
			<Header />
			<main className="machine-panel">
				<Layout className="machine-panel__container">
					<PageTitleWithSync updateTo="/customer/machine-panel" title="Painel de máquinas" />
					{renderContent()}
				</Layout>
			</main>
		</>
	)
}