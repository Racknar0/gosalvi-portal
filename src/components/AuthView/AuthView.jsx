'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Icon } from '@iconify/react/offline';
import shieldIcon from '@iconify-icons/lucide/shield-check';
import arrowIcon from '@iconify-icons/lucide/arrow-right';
import FormNotice from '@/components/FormNotice/FormNotice';
import PasswordField from '@/components/PasswordField/PasswordField';
import RequiredMark from '@/components/RequiredMark/RequiredMark';
import { useCountry } from '@/helpers/countryPreference';
import {
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerification,
  login,
  authError,
} from '@/services/AuthService';
import { authViewCopy } from './AuthView.copy';
import './AuthView.scss';

export default function AuthView({ mode }) {
  const copy = authViewCopy[useCountry()];
  const content = copy.modes[mode];
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get('token') || '';
  const invalidToken =
    (mode === 'verify' || mode === 'reset') &&
    !/^[A-Za-z0-9_-]{43}$/.test(token);
  const [notice, setNotice] = useState('');
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);
  async function submit(event) {
    event.preventDefault();
    if (pending || invalidToken) return;
    const form = new FormData(event.currentTarget);
    const password = String(form.get('password') || '');
    if (mode === 'reset' && password !== form.get('passwordConfirmation')) {
      setNotice(copy.mismatch);
      return;
    }
    if (new TextEncoder().encode(password).length > 72) {
      setNotice(copy.tooLong);
      return;
    }
    setPending(true);
    setNotice('');
    try {
      const email = String(form.get('email') || '').trim();
      if (mode === 'admin') {
        const result = await login({ email, password, portal: 'admin' });
        router.replace(result.redirect);
        return;
      }
      const result =
        mode === 'forgot'
          ? await forgotPassword({ email })
          : mode === 'resend'
            ? await resendVerification({ email })
            : mode === 'verify'
              ? await verifyEmail({ token })
              : await resetPassword({ token, password });
      setNotice(
        mode === 'verify'
          ? copy.verified
          : mode === 'reset'
            ? copy.success
            : result.message,
      );
      setDone(true);
    } catch (error) {
      setNotice(authError(error));
    } finally {
      setPending(false);
    }
  }
  const requestLink =
    mode === 'reset' ? '/recuperar-password' : '/reenviar-verificacion';
  return (
    <main className="salvi-auth">
      <section className="salvi-auth__card">
        <span className="salvi-auth__tag">
          <Icon icon={shieldIcon} aria-hidden="true" />
          {content.tag}
        </span>
        <h1>{content.title}</h1>
        <p>{content.description}</p>
        {invalidToken && (
          <FormNotice>
            {copy.invalid} <Link href={requestLink}>{copy.resend}</Link>
          </FormNotice>
        )}
        {notice && <FormNotice success={done}>{notice}</FormNotice>}
        {!done && (
          <form onSubmit={submit}>
            {['forgot', 'resend', 'admin'].includes(mode) && (
              <label htmlFor={`${mode}-email`}>
                <span>
                  {copy.email}
                  <RequiredMark />
                </span>
                <input
                  id={`${mode}-email`}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  maxLength={254}
                />
              </label>
            )}
            {['reset', 'admin'].includes(mode) && (
              <label htmlFor={`${mode}-password`}>
                <span>
                  {mode === 'admin' ? 'Contraseña' : copy.password}
                  <RequiredMark />
                </span>
                <PasswordField
                  id={`${mode}-password`}
                  autoComplete={
                    mode === 'admin' ? 'current-password' : 'new-password'
                  }
                />
              </label>
            )}
            {mode === 'reset' && (
              <>
                <label htmlFor="reset-confirmation">
                  <span>
                    {copy.confirmation}
                    <RequiredMark />
                  </span>
                  <PasswordField
                    id="reset-confirmation"
                    name="passwordConfirmation"
                    confirmation
                  />
                </label>
                <small>{copy.passwordHint}</small>
              </>
            )}
            <button
              className="salvi-auth__submit"
              type="submit"
              disabled={pending || invalidToken}
            >
              {pending ? copy.pending : content.submit}
              <Icon icon={arrowIcon} aria-hidden="true" />
            </button>
          </form>
        )}
        {done && ['forgot', 'resend'].includes(mode) && (
          <p className="salvi-auth__hint">{copy.emailSent}</p>
        )}
        <div className="salvi-auth__links">
          {mode === 'admin' && (
            <Link href="/recuperar-password">{copy.forgotLink}</Link>
          )}
          {done && ['verify', 'reset'].includes(mode) && (
            <Link href="/socios/login">{copy.portal}</Link>
          )}
          <Link href="/usuarios">{copy.back}</Link>
          {!done && (mode === 'verify' || mode === 'reset') && (
            <Link href={requestLink}>{copy.resend}</Link>
          )}
        </div>
      </section>
    </main>
  );
}
