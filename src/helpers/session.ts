import { cookies } from 'next/headers';

const SESSION_NAME = 'current_logged_user';
const generateExpires = () => new Date(Date.now() + 24 * 60 * 60 * 1000 - 3 * 60 * 60 * 1000);

export const createSession = async (payload: string) => {
	const cookieStore = await cookies();
	cookieStore.set(SESSION_NAME, payload, {
		expires: generateExpires(),
		httpOnly: false
	});
};

export const getSession = async (): Promise<any | undefined> => {
	const cookieStore = await cookies();
	const session = cookieStore.get(SESSION_NAME)?.value;
	if (!session) return undefined;

	try {
		return JSON.parse(session);
	} catch (error) {
		return undefined;
	}
};

export const logout = async () => {
	const cookieStore = await cookies();
	cookieStore.delete(SESSION_NAME);
}