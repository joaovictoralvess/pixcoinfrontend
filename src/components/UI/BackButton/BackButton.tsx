'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/Forms/Button/Button';

export default function BackButton() {
	const router = useRouter();

	return (
		<Button onClick={() => router.back()}>Voltar a página anterior</Button>
	);
}