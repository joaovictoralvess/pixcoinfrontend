import { redirectCustomerToLoginIfNotLogged } from '@/helpers/customer';

import Header from '@/components/UI/Header/Header';
import Layout from '@/components/UI/Layout/Layout';
import GoBackIcon from '@/components/Icons/GoBackIcon';

import Button from '@/components/Forms/Button/Button';

import './styles.scss';
import BackButton from '@/components/UI/BackButton/BackButton';

export default async function HowToUseScreen() {
	const user = await redirectCustomerToLoginIfNotLogged();

	return (
		<>
			<Header
				userName={user.name}
				iconLeft={<GoBackIcon />}
			/>
			<main className="how-to-use">
				<Layout className="how-to-use__container">

					<h1>Ainda estamos trabalhando nisso...</h1>
					<h2>Paciência jovem gafanhoto 🦗</h2>
					<BackButton />
				</Layout>
			</main>
		</>
	);
}
