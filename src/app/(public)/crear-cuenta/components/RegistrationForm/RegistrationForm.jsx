'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { Icon } from '@iconify/react/offline';
import checkIcon from '@iconify-icons/lucide/check';
import eyeIcon from '@iconify-icons/lucide/eye';
import eyeOffIcon from '@iconify-icons/lucide/eye-off';
import arrowLeftIcon from '@iconify-icons/lucide/arrow-left';
import arrowRightIcon from '@iconify-icons/lucide/arrow-right';
import shieldCheckIcon from '@iconify-icons/lucide/shield-check';
import RequiredMark from '@/components/RequiredMark/RequiredMark';
import PhoneField from '@/components/PhoneField/PhoneField';
import LocationFields from '../LocationFields/LocationFields';
import { useCountry } from '@/helpers/countryPreference';
import { registrationCopy } from './RegistrationForm.copy';
import './RegistrationForm.scss';
import FormNotice from '@/components/FormNotice/FormNotice';
import RegistrationSuccess from '@/components/RegistrationSuccess/RegistrationSuccess';
import { registerCustomer, authError } from '@/services/AuthService';

export default function RegistrationForm({ countries, initialCities }) {
  const copy = registrationCopy[useCountry()];
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [confirmationTouched, setConfirmationTouched] = useState(false);
  const confirmationInput = useRef(null);
  const passwordMismatch = confirmationTouched && confirmation.length > 0 && password !== confirmation;

  function updatePassword(value) {
    setPassword(value);
    confirmationInput.current?.setCustomValidity(confirmation && value !== confirmation ? 'Las contraseñas no coinciden.' : '');
  }

  function updateConfirmation(value) {
    setConfirmation(value);
    confirmationInput.current?.setCustomValidity(value && value !== password ? 'Las contraseñas no coinciden.' : '');
  }
  const [notice, setNotice] = useState('');
  const [phone, setPhone] = useState('');
  const [pending, setPending] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  if (registeredEmail) return <main className="registration"><section className="registration__card"><RegistrationSuccess email={registeredEmail} /></section></main>;

  return (
    <main className="registration">
      <div className="registration__inner">
        <Link className="registration__back" href="/usuarios"><Icon icon={arrowLeftIcon} aria-hidden="true" />{copy.back}</Link>
        <header className="registration__intro">
          <h1>{copy.title}</h1>
          <p>{copy.intro}</p>
          <ul>
            {copy.benefits.map((benefit) => <li key={benefit}><Icon icon={checkIcon} aria-hidden="true" /><span>{benefit}</span></li>)}
          </ul>
        </header>
        <section className="registration__card" aria-labelledby="registration-title">
          <header className="registration__heading">
            <h2 id="registration-title">{copy.formTitle}</h2>
          </header>
          <button type="button" className="registration__google" disabled title="El registro con Google todavía no está habilitado">
            <svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11c-.5 2.5-1.9 4.6-4.1 6v5h6.6c3.9-3.6 6.1-8.8 6.1-14.7Z"/><path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.6-5c-1.8 1.2-4.2 1.9-6.9 1.9-5.3 0-9.8-3.6-11.4-8.4H5.8v5.2A20.4 20.4 0 0 0 24 44Z"/><path fill="#FBBC05" d="M12.6 27.7a12.3 12.3 0 0 1 0-7.4v-5.2H5.8a20.4 20.4 0 0 0 0 17.8l6.8-5.2Z"/><path fill="#EA4335" d="M24 11.9c3 0 5.6 1 7.7 3l5.8-5.8A19.5 19.5 0 0 0 24 4 20.4 20.4 0 0 0 5.8 15.1l6.8 5.2c1.6-4.8 6.1-8.4 11.4-8.4Z"/></svg>
            {copy.google}
          </button>
          <div className="registration__divider">{copy.divider}</div>
          <p className="registration__required-note"><RequiredMark /> Campos obligatorios</p>
          <form onSubmit={async (event) => {
            event.preventDefault();
            if (pending) return;
            if (password !== confirmation) {
              setConfirmationTouched(true);
              confirmationInput.current?.focus();
              return;
            }
            if (new TextEncoder().encode(password).length > 72) { setNotice(copy.tooLong); return; }
            const form = event.currentTarget;
            const data = new FormData(form);
            const email = String(data.get('email') || '').trim();
            setPending(true); setNotice('');
            try {
              await registerCustomer({ name: data.get('name'), email, phone, password, acceptedTerms: data.get('terms') === 'on', countryCode: data.get('country'), city: form.querySelector('#register-city')?.selectedOptions[0]?.value ? form.querySelector('#register-city').selectedOptions[0].textContent : '' });
              setRegisteredEmail(email);
            } catch (error) { setNotice(authError(error)); }
            finally { setPending(false); }
          }}>
            <div className="registration__row">
              <label htmlFor="register-name"><span>{copy.name}<RequiredMark /></span><input id="register-name" name="name" autoComplete="name" required minLength={2} maxLength={100} /></label>
              <label htmlFor="register-email"><span>{copy.email}<RequiredMark /></span><input id="register-email" name="email" type="email" autoComplete="email" required maxLength={254} /></label>
            </div>
            <div className="registration__phone-field"><label htmlFor="register-phone"><span>{copy.phone}<RequiredMark /></span></label><PhoneField id="register-phone" value={phone} onChange={setPhone} required /></div>
            <div className="registration__row registration__credentials">
              <div className="registration__password-field">
                <label htmlFor="register-password"><span>{copy.password}<RequiredMark /></span></label>
                <span className="registration__password">
                  <input id="register-password" name="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => updatePassword(event.target.value)} autoComplete="new-password" required minLength={8} maxLength={128} aria-describedby="register-password-hint" />
                  <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} aria-pressed={showPassword}><Icon icon={showPassword ? eyeOffIcon : eyeIcon} aria-hidden="true" /></button>
                </span>
                <span id="register-password-hint" className="registration__hint">{copy.passwordHint}</span>
              </div>
              <div className="registration__password-field">
                <label htmlFor="register-password-confirmation"><span>{copy.confirmation}<RequiredMark /></span></label>
                <span className="registration__password">
                  <input ref={confirmationInput} id="register-password-confirmation" name="passwordConfirmation" type={showConfirmation ? 'text' : 'password'} value={confirmation} onChange={(event) => updateConfirmation(event.target.value)} onBlur={() => setConfirmationTouched(true)} onInvalid={() => setConfirmationTouched(true)} autoComplete="new-password" required minLength={8} maxLength={128} aria-invalid={passwordMismatch || undefined} aria-describedby={passwordMismatch ? 'register-confirmation-error' : undefined} />
                  <button type="button" onClick={() => setShowConfirmation((visible) => !visible)} aria-label={showConfirmation ? 'Ocultar confirmación de contraseña' : 'Mostrar confirmación de contraseña'} aria-pressed={showConfirmation}><Icon icon={showConfirmation ? eyeOffIcon : eyeIcon} aria-hidden="true" /></button>
                </span>
                {passwordMismatch && <span id="register-confirmation-error" className="registration__error" role="alert">{copy.mismatch}</span>}
              </div>
            </div>
            <LocationFields countries={countries} initialCities={initialCities} />
            <label className="registration__terms"><input type="checkbox" name="terms" required /><span>Leí y acepto los <Link href="/terminos" target="_blank" rel="noopener noreferrer">Términos y condiciones</Link> y la <Link href="/privacidad" target="_blank" rel="noopener noreferrer">Política de privacidad</Link> de Salvi.<RequiredMark /></span></label>
            <FormNotice>{notice}</FormNotice>
            <button type="submit" className="registration__submit" disabled={pending}>{pending ? copy.pending : copy.submit} <Icon icon={arrowRightIcon} aria-hidden="true" /></button>
          </form>
          <p className="registration__privacy"><Icon icon={shieldCheckIcon} aria-hidden="true" /> {copy.privacy}</p>
        </section>
      </div>
    </main>
  );
}
