import { cookies } from 'next/headers';

import jwt, { JwtPayload } from 'jsonwebtoken';

const SESSION_NAME = 'current_user';
const generateExpires = () => new Date(Date.now() + 60 * 60 * 1000);

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

export const updateSession = async () => {
	const session = await getSession();
	if (!session) return null;

	const expires = generateExpires();

	return {
		name: SESSION_NAME,
		value: JSON.stringify(session),
		expires,
		httpOnly: false,
	};
};

export const logout = async () => {
	const cookieStore = await cookies();
	cookieStore.set(SESSION_NAME, '', { expires: new Date(0), path: '/' });
}

export function isTokenExpired(token: string): boolean {
	const decoded = jwt.decode(token) as JwtPayload | null;

	if (!decoded || !decoded.exp) {
		throw new Error('Token inválido ou sem campo "exp".');
	}

	const currentTime = Math.floor(Date.now() / 1000);
	return decoded.exp < currentTime;
}