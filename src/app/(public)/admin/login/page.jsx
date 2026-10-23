import { Suspense } from 'react';
import AuthView from '@/components/AuthView/AuthView';
export default function AdminLoginPage() {
  return (
    <Suspense fallback={<p role="status">Cargando…</p>}>
      <AuthView mode="admin" />
    </Suspense>
  );
}
