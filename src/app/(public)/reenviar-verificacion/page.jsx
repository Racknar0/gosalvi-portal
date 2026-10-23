import { Suspense } from 'react';
import AuthView from '@/components/AuthView/AuthView';
export default function ResendPage() { return <Suspense fallback={<p role="status">Cargando…</p>}><AuthView mode="resend" /></Suspense>; }
