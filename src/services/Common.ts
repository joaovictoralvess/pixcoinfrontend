export const CommonService = {
	forgotPassword: async (data: { email: string }): Promise<{
		error: boolean;
		message: string;
	}>=> {
		try {
			const response = await fetch(`${process.env.REACT_APP_SERVIDOR}/forgot-password`, {
				method: 'POST',
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			return await response.json();
		} catch (error) {
			return {
				error: true,
				message: 'Ocorre uma falha ao enviar o e-mail.'
			}
		}
	}
}