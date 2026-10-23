'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react/offline';
import mapPinIcon from '@iconify-icons/lucide/map-pin';
import pencilIcon from '@iconify-icons/lucide/pencil';
import arrowRightIcon from '@iconify-icons/lucide/arrow-right';
import { useCountry } from '@/helpers/countryPreference';
import RequiredMark from '@/components/RequiredMark/RequiredMark';
import PartnerLocationPicker from '../PartnerLocationPicker/PartnerLocationPicker';
import { partnerAddressCopy } from './PartnerAddress.copy';
import './PartnerAddress.scss';

export default function PartnerAddress({
  id,
  label,
  value,
  onChange,
  location,
  onConfirm,
}) {
  const [open, setOpen] = useState(false);
  const copy = partnerAddressCopy[useCountry()];
  return (
    <div className="partner-address">
      <label className="partner-address__heading" htmlFor={id}>
        {label.replace(/\s*\*$/, '')}
        <RequiredMark />
      </label>
      <button
        id={id}
        type="button"
        className={`partner-address__choose${location ? ' partner-address__choose--selected' : ''}`}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
      >
        <Icon icon={mapPinIcon} aria-hidden="true" />
        <span>
          <strong>{location ? value : copy.title}</strong>
          <small>
            {location
              ? location.reference ||
                (location.verificationStatus === 'manual'
                  ? copy.manual
                  : copy.confirmed)
              : copy.hint}
          </small>
        </span>
        <span className="partner-address__action">
          {location ? copy.edit : copy.open}
          <Icon
            icon={location ? pencilIcon : arrowRightIcon}
            aria-hidden="true"
          />
        </span>
      </button>
      {open && (
        <PartnerLocationPicker
          id={id}
          value={value}
          location={location}
          onClose={() => setOpen(false)}
          onConfirm={(selected) => {
            onChange(selected.formattedAddress);
            onConfirm?.(selected);
            console.info(
              '[Salvi] Ubicación del comercio',
              JSON.stringify({ fieldId: id, ...selected }, null, 2),
            );
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}
