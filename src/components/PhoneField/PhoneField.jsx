'use client';

import PhoneInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import spanishLabels from 'react-phone-number-input/locale/es';
import { useCountry } from '@/helpers/countryPreference';
import 'react-phone-number-input/style.css';
import './PhoneField.scss';

export default function PhoneField({
  id,
  name = 'phone',
  value,
  onChange,
  required = false,
}) {
  const country = useCountry();
  return (
    <PhoneInput
      className="salvi-phone"
      id={id}
      name={name}
      defaultCountry={country}
      countries={['AR', 'CO']}
      international
      countryCallingCodeEditable={false}
      flags={flags}
      labels={spanishLabels}
      countrySelectProps={{ 'aria-label': 'Código de país' }}
      value={value}
      onChange={(phone) => onChange(phone || '')}
      autoComplete="tel"
      required={required}
      minLength={7}
      maxLength={30}
    />
  );
}
