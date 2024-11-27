import { cookies } from 'next/headers';

const SESSION_NAME = 'user_session';
const generateExpires = () => new Date(Date.now() + 60 * 60 * 1000);

export const createSession = async (payload: string) => {
	const cookieStore = await cookies();
	cookieStore.set(SESSION_NAME, payload, {
		expires: generateExpires(),
		httpOnly: true
	});
};