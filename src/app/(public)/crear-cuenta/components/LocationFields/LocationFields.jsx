'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { loadCountryCities } from '../../../locationActions';
import { DEFAULT_LOCATION } from '@/helpers/locationDefaults';
import { setCountry, useCountry } from '@/helpers/countryPreference';
import './LocationFields.scss';

export default function LocationFields({ countries, initialCities }) {
  const country = useCountry();
  const [citySelection, setCitySelection] = useState({ country: DEFAULT_LOCATION.countryCode, value: DEFAULT_LOCATION.cityId });
  const city = citySelection.country === country ? citySelection.value : '';
  const [cities, setCities] = useState(initialCities);
  const [error, setError] = useState('');
  const [pending, startTransition] = useTransition();
  const requestSequence = useRef(0);

  useEffect(() => {
    const sequence = ++requestSequence.current;
    let active = true;
    Promise.resolve().then(async () => {
      if (!active || sequence !== requestSequence.current) return;
      setError('');
      if (country === DEFAULT_LOCATION.countryCode) {
        setCities(initialCities);
        return;
      }
      setCities([]);
      startTransition(async () => {
        try {
          const options = await loadCountryCities(country);
          if (active && sequence === requestSequence.current) setCities(options);
        } catch {
          if (active && sequence === requestSequence.current) setError('No pudimos cargar las ciudades. Vuelve a elegir el país para intentarlo de nuevo.');
        }
      });
    });
    return () => { active = false; };
  }, [country, initialCities]);

  function changeCountry(event) {
    const code = event.target.value;
    setCitySelection({ country: code, value: '' });
    setCountry(code);
  }

  const message = error || (pending ? 'Cargando ciudades…' : country && !cities.length ? 'No hay ciudades disponibles para este país. Podés continuar sin ubicación.' : '');

  return (
    <div className="registration-location">
      <div className="registration__row">
        <label htmlFor="register-country"><span>País <span className="registration-location__optional">(opcional)</span></span><select id="register-country" name="country" autoComplete="country" value={country} onChange={changeCountry}>{countries.map(({ code, name }) => <option key={code} value={code}>{name}</option>)}</select></label>
        <label htmlFor="register-city"><span>Ciudad <span className="registration-location__optional">(opcional)</span></span><select id="register-city" name="city" autoComplete="address-level2" value={city} onChange={(event) => setCitySelection({ country, value: event.target.value })} disabled={!country || pending || !cities.length} aria-busy={pending} aria-describedby={message ? 'register-location-status' : undefined}><option value="">{pending ? 'Cargando ciudades…' : country === 'CO' ? 'Elige una ciudad' : 'Elegí una ciudad'}</option>{cities.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}</select></label>
      </div>
      {message && <p id="register-location-status" className="registration-location__status" role="status">{message}</p>}
    </div>
  );
}
