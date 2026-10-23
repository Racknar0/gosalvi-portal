import { Suspense } from 'react';
import AuthView from '@/components/AuthView/AuthView';
export default function VerifyPage() { return <Suspense fallback={<p role="status">Cargando…</p>}><AuthView mode="verify" /></Suspense>; }
