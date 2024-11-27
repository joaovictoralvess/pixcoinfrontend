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

export const getSession = async (): Promise<any | undefined> => {
	const cookieStore = await cookies();
	const session = cookieStore.get(SESSION_NAME)?.value;
	if (!session) return undefined;

	return JSON.parse(session);
};

export const updateSession = async () => {
	const session = await getSession();
	if (!session) return null;

	const expires = generateExpires();

	return {
		name: SESSION_NAME,
		value: JSON.stringify(session),
		expires,
		httpOnly: true,
	};
};

export const logout = async () => {
	const cookieStore = await cookies();
	cookieStore.set(SESSION_NAME, '', {expires: new Date(0)});
}
