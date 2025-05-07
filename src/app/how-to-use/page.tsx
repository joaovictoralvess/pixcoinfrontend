import { redirectCustomerToLoginIfNotLogged } from '@/helpers/customer';

import Header from '@/components/UI/Header/Header';
import Layout from '@/components/UI/Layout/Layout';
import PageTitleWithSync from '@/components/UI/PageTitleWithSync/PageTitleWithSync';
import GoBackIcon from '@/components/Icons/GoBackIcon';

import './styles.scss';

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
					<div className="how-to-use__container__wrapper-buttons">
						<PageTitleWithSync title="Como usar a telemetria PIXcoin" />
					</div>

					<iframe
						width="560"
						height="315"
						src="https://www.youtube.com/embed/80_M97jXFpE?si=2-onv5Lm3HB0gOwu"
						title="YouTube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerPolicy="strict-origin-when-cross-origin"
						allowFullScreen
					></iframe>
				</Layout>
			</main>
		</>
	);
}
