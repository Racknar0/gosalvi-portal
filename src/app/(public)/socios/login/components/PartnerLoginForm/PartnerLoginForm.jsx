'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react/offline';
import mailIcon from '@iconify-icons/lucide/mail';
import lockIcon from '@iconify-icons/lucide/lock';
import eyeIcon from '@iconify-icons/lucide/eye';
import eyeOffIcon from '@iconify-icons/lucide/eye-off';
import arrowIcon from '@iconify-icons/lucide/arrow-right';
import RequiredMark from '@/components/RequiredMark/RequiredMark';
import './PartnerLoginForm.scss';

export default function PartnerLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState('');
  return (
    <form className="partner-form partner-login" aria-label="Iniciar sesión de comercio" onSubmit={(event) => { event.preventDefault(); setNotice('El inicio de sesión todavía no está conectado. No se enviaron tus credenciales.'); }}>
      <label className="partner-form__field" htmlFor="partner-login-email"><span>Email Comercial / CUIT<RequiredMark /></span>
        <span className="partner-login__input"><Icon icon={mailIcon} aria-hidden="true" /><input id="partner-login-email" name="emailOrTaxId" required autoComplete="username" /></span>
      </label>
      <div>
        <div className="partner-login__password-label"><label className="partner-form__field" htmlFor="partner-login-password">Contraseña de Comercio<RequiredMark /></label><button type="button" onClick={() => setNotice('La recuperación de contraseña todavía no está habilitada.')}>¿Olvidaste tu clave?</button></div>
        <div className="partner-login__input"><Icon icon={lockIcon} aria-hidden="true" /><input id="partner-login-password" name="password" required type={showPassword ? 'text' : 'password'} autoComplete="current-password" /><button type="button" aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'} aria-pressed={showPassword} onClick={() => setShowPassword((show) => !show)}><Icon icon={showPassword ? eyeOffIcon : eyeIcon} aria-hidden="true" /></button></div>
      </div>
      {notice && <p role="status" className="partner-form__notice">{notice}</p>}
      <button className="partner-form__submit" type="submit">Ingresar al Portal Socio <Icon icon={arrowIcon} aria-hidden="true" /></button>
    </form>
  );
}
