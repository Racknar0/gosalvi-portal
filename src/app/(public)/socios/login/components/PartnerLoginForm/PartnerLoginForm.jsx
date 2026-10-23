'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react/offline';
import mailIcon from '@iconify-icons/lucide/mail';
import lockIcon from '@iconify-icons/lucide/lock';
import eyeIcon from '@iconify-icons/lucide/eye';
import eyeOffIcon from '@iconify-icons/lucide/eye-off';
import arrowIcon from '@iconify-icons/lucide/arrow-right';
import RequiredMark from '@/components/RequiredMark/RequiredMark';
import './PartnerLoginForm.scss';
import FormNotice from '@/components/FormNotice/FormNotice';
import { login, authError } from '@/services/AuthService';
import { useCountry } from '@/helpers/countryPreference';
import { partnerLoginFormCopy } from './PartnerLoginForm.copy';

export default function PartnerLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState('');
  const [pending, setPending] = useState(false);
  const [errorCode, setErrorCode] = useState('');
  const router = useRouter();
  const copy = partnerLoginFormCopy[useCountry()];
  return (
    <form className="partner-form partner-login" aria-label="Iniciar sesión de comercio" onSubmit={async (event) => {
      event.preventDefault();
      if (pending) return;
      const form = new FormData(event.currentTarget);
      setPending(true); setNotice(''); setErrorCode('');
      try { const result = await login({ email: form.get('email'), password: form.get('password') }); router.replace(result.redirect); }
      catch (error) { setNotice(authError(error)); setErrorCode(error.response?.data?.code || ''); }
      finally { setPending(false); }
    }}>
      <label className="partner-form__field" htmlFor="partner-login-email"><span>{copy.email}<RequiredMark /></span>
        <span className="partner-login__input"><Icon icon={mailIcon} aria-hidden="true" /><input id="partner-login-email" type="email" name="email" required autoComplete="username" maxLength={254} /></span>
      </label>
      <div>
        <div className="partner-login__password-label"><label className="partner-form__field" htmlFor="partner-login-password">{copy.password}<RequiredMark /></label><Link href="/recuperar-password">{copy.forgot}</Link></div>
        <div className="partner-login__input"><Icon icon={lockIcon} aria-hidden="true" /><input id="partner-login-password" name="password" required type={showPassword ? 'text' : 'password'} autoComplete="current-password" /><button type="button" aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'} aria-pressed={showPassword} onClick={() => setShowPassword((show) => !show)}><Icon icon={showPassword ? eyeOffIcon : eyeIcon} aria-hidden="true" /></button></div>
      </div>
      <FormNotice>{notice}{errorCode === 'EMAIL_NOT_VERIFIED' && <> <Link href="/reenviar-verificacion">{copy.unverified}</Link></>}{errorCode === 'APP_ONLY' && <> <Link href="/usuarios">{copy.client}</Link></>}</FormNotice>
      <button className="partner-form__submit" type="submit" disabled={pending}>{pending ? copy.pending : copy.submit} <Icon icon={arrowIcon} aria-hidden="true" /></button>
    </form>
  );
}
