import Header from '@/components/UI/Header/Header';
import Layout from '@/components/UI/Layout/Layout';
import PageTitleWithSync from '@/components/UI/PageTitleWithSync/PageTitleWithSync';

import './styles.scss';

export default function AdminCustomers() {
	return (
		<>
			<Header />
			<main className='customers'>
				<Layout className='customers__container'>
					<PageTitleWithSync updateTo='/admin/customers' title='Painel de clientes' />
				</Layout>
			</main>
		</>
	)
}