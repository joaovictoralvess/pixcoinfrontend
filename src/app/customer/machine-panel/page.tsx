import Header from '@/components/UI/Header/Header';
import Layout from '@/components/UI/Layout/Layout';
import PageTitleWithSync from '@/components/UI/PageTitleWithSync/PageTitleWithSync';
import Machine from '@/components/UI/Machine/Machine';

import { redirectCustomerToLoginIfNotLogged } from '@/helpers/customer';

import MachineService from '@/services/Machine';

import CustomersService from '@/services/Customers';
import WarningMessage from '@/app/customer/machine-panel/components/WarningMessage/WarningMessage';
import CustomerActions from '@/app/admin/customers/components/CustomerActions/CustomerActions';

import './styles.scss';

export default async function MachinePanel() {
	const user = await redirectCustomerToLoginIfNotLogged();

	const [machines, { message }] = await Promise.all([
		MachineService.all(user),
		CustomersService.getWarning(user.id),
	]);

	const machinesDisabled = machines.every((machine) => machine.disabled);

	const renderContent = () => {
		if (machinesDisabled) {
			return (
				<div className="machine-panel__container__disabled-machine">
					<p>
						Informamos que as máquinas vinculadas ao seu cadastro foram
						desabilitadas devido à pendência de pagamento. Por favor, regularize
						sua situação para reativar os serviços. 😉
					</p>
				</div>
			);
		}

		if (machines.length === 0) {
			return <h1>Nenhuma máquina encontrada...</h1>;
		}

		return (
			<>
				{message && <WarningMessage message={message} />}
				<p className="machine-panel__tip">
					Selecione uma máquina para ver mais detalhes
				</p>
				{machines &&
					machines.length &&
					machines.map((machine) => (
						<div
							key={`${machine.id}`}
							className="machine-panel__container__wrapper-machines"
						>
							<Machine user={user} machine={machine} />
						</div>
					))}
			</>
		);
	};

	return (
		<>
			<Header />
			<main className="machine-panel">
				<Layout className="machine-panel__container">
					<div className="machine-panel__container__wrapper-buttons">
						<PageTitleWithSync
							title="Painel de máquinas"
						/>
						{!user.employee && (
							<>
								<CustomerActions
									clientId={user.id}
									shouldRender="new-employee"
								/>
								<CustomerActions shouldRender="my-employees" />
							</>
						)}
					</div>
					{renderContent()}
				</Layout>
			</main>
		</>
	);
}
