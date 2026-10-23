'use client';

import { Icon } from '@iconify/react/offline';
import usersIcon from '@iconify-icons/lucide/users';
import shieldCheckIcon from '@iconify-icons/lucide/shield-check';
import starIcon from '@iconify-icons/lucide/star';
import handshakeIcon from '@iconify-icons/lucide/handshake';
import zapIcon from '@iconify-icons/lucide/zap';
import clockIcon from '@iconify-icons/lucide/clock';
import './MerchantsBenefits.scss';
import { useCountry } from '@/helpers/countryPreference';
import { merchantsBenefitsCopy } from './MerchantsBenefits.copy';

const icons = [usersIcon, shieldCheckIcon, starIcon, handshakeIcon, zapIcon, clockIcon];

export default function MerchantsBenefits() {
  const copy = merchantsBenefitsCopy[useCountry()];
  return (
    <section className="merchants-benefits" id="beneficios-b2b" aria-labelledby="merchants-benefits-title">
      <div className="merchants-benefits__inner">
        <div className="merchants-benefits__heading">
          <span className="merchants-benefits__eyebrow">{copy.eyebrow}</span>
          <h2 id="merchants-benefits-title">{copy.title}</h2>
          <p>{copy.description}</p>
        </div>
        <ul className="merchants-benefits__grid">
          {copy.cards.map(([label, title, description], index) => (
            <li className="merchants-benefits__card" key={label}>
              <div className="merchants-benefits__card-top">
                <span className="merchants-benefits__icon"><Icon icon={icons[index]} aria-hidden="true" /></span>
                <span className="merchants-benefits__label">{label}</span>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
