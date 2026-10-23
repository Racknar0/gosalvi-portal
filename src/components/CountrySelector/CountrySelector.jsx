'use client';

import { useCountry, setCountry } from '@/helpers/countryPreference';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react/offline';
import chevronDownIcon from '@iconify-icons/lucide/chevron-down';
import Image from 'next/image';
import './CountrySelector.scss';

const countries = [
  { code: 'AR', name: 'Argentina', flag: '/assets/flags/argentina.svg' },
  { code: 'CO', name: 'Colombia', flag: '/assets/flags/colombia.svg' },
];

export default function CountrySelector({ className = '' }) {
  const activeCountry = useCountry();
  const [open, setOpen] = useState(false);
  const root = useRef(null);
  const selected = countries.find(({ code }) => code === activeCountry) || countries[0];

  useEffect(() => {
    if (!open) return undefined;
    const close = (event) => {
      if (event.type === 'keydown' && event.key !== 'Escape') return;
      if (event.type === 'pointerdown' && root.current?.contains(event.target)) return;
      setOpen(false);
    };
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('keydown', close);
    };
  }, [open]);

  return (
    <div className={`country-selector ${className}`} ref={root}>
      <button type="button" className="country-selector__trigger" aria-label={`País: ${selected.name}`} aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        <Image className="country-selector__flag" src={selected.flag} alt="" width={24} height={16} />
        <Icon icon={chevronDownIcon} aria-hidden="true" />
      </button>
      {open && <div className="country-selector__menu" role="listbox" aria-label="Seleccionar país">
        {countries.map(({ code, name, flag }) => (
          <button key={code} type="button" role="option" aria-selected={activeCountry === code} className={activeCountry === code ? 'is-active' : ''} onClick={() => { setCountry(code); setOpen(false); }}>
            <Image className="country-selector__flag" src={flag} alt="" width={24} height={16} />
            <span>{name}</span>
          </button>
        ))}
      </div>}
    </div>
  );
}
