'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react/offline';
import storeIcon from '@iconify-icons/lucide/store';
import logoutIcon from '@iconify-icons/lucide/log-out';
import shieldIcon from '@iconify-icons/lucide/shield-check';
import FormNotice from '@/components/FormNotice/FormNotice';
import useStore from '@/store/useStore';
import { currentUser, restoreAuth, logout, authError } from '@/services/AuthService';
import { useCountry } from '@/helpers/countryPreference';
import { privatePanelCopy } from './PrivatePanel.copy';
import './PrivatePanel.scss';

export default function PrivatePanel({ admin = false, children }) {
  const router = useRouter();
  const user = useStore((state) => state.user);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  const copy = privatePanelCopy[useCountry()];
  useEffect(() => {
    let active = true;
    Promise.resolve().then(async () => {
      setChecking(true); setError('');
      if (!restoreAuth()) { router.replace(admin ? '/admin/login' : '/socios/login'); return; }
      try {
        const profile = await currentUser();
        if (!active) return;
        if (admin && profile.platformRole !== 'ADMIN') { router.replace('/socios/panel'); return; }
        if (!admin && !profile.memberships.length && profile.platformRole === 'ADMIN') { router.replace('/admin'); return; }
        useStore.getState().login(useStore.getState().token, profile);
        setChecking(false);
      } catch (failure) {
        if (!active) return;
        if ([401, 403].includes(failure.response?.status)) { logout(); router.replace(admin ? '/admin/login' : '/socios/login'); }
        else { setError(authError(failure)); setChecking(false); }
      }
    });
    return () => { active = false; };
  }, [admin, router, attempt]);
  function exit() { logout(); router.replace(admin ? '/admin/login' : '/socios/login'); }
  return <div className="private-panel"><header className="private-panel__header"><Link href="/usuarios" aria-label="Salvi, inicio"><Image src="/assets/brand/salvi.svg" width={130} height={44} alt="Salvi" /></Link><span className="private-panel__scope"><Icon icon={admin ? shieldIcon : storeIcon} aria-hidden="true" />{admin ? copy.admin : copy.business}</span><div className="private-panel__account">{!checking && <span>{user?.name}</span>}<button type="button" onClick={exit}><Icon icon={logoutIcon} aria-hidden="true" />{copy.logout}</button></div></header><main className="private-panel__main">{checking ? <p className="private-panel__loading" role="status">{copy.loading}</p> : error ? <><FormNotice>{error}</FormNotice><button className="private-panel__retry" type="button" onClick={() => setAttempt((value) => value + 1)}>{copy.retry}</button></> : user && (admin ? children : <section className="private-panel__welcome"><span className="private-panel__welcome-icon"><Icon icon={storeIcon} aria-hidden="true" /></span><p>{copy.greeting}, {user.name}</p><h1>{copy.title}</h1><p>{copy.message}</p>{user.memberships.map(({ business }) => <div className="private-panel__business" key={business.id}><strong>{business.name}</strong><span>{({ PENDING_REVIEW: copy.pending, APPROVED: copy.approved, REJECTED: copy.rejected, SUSPENDED: copy.suspended, DRAFT: copy.draft })[business.status]}</span></div>)}<Link href="/comercios">{copy.home}</Link>{user.platformRole === 'ADMIN' && <Link href="/admin">{copy.adminLink}</Link>}</section>)}</main></div>;
}
