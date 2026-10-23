'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react/offline';
import eyeIcon from '@iconify-icons/lucide/eye';
import eyeOffIcon from '@iconify-icons/lucide/eye-off';
import './PasswordField.scss';

export default function PasswordField({
  id,
  name = 'password',
  label,
  confirmation = false,
  ...props
}) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="salvi-password">
      <input
        {...props}
        id={id}
        name={name}
        aria-label={label}
        type={visible ? 'text' : 'password'}
        minLength={8}
        maxLength={72}
        required
        autoComplete={props.autoComplete || 'new-password'}
      />
      <button
        type="button"
        aria-label={`${visible ? 'Ocultar' : 'Mostrar'} ${confirmation ? 'confirmación' : 'contraseña'}`}
        aria-pressed={visible}
        onClick={() => setVisible((value) => !value)}
      >
        <Icon icon={visible ? eyeOffIcon : eyeIcon} aria-hidden="true" />
      </button>
    </div>
  );
}
