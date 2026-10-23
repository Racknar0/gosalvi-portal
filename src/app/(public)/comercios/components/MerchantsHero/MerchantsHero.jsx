'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react/offline';
import storeIcon from '@iconify-icons/lucide/store';
import arrowRightIcon from '@iconify-icons/lucide/arrow-right';
import chevronRightIcon from '@iconify-icons/lucide/chevron-right';
import checkCircleIcon from '@iconify-icons/lucide/circle-check';
import zapIcon from '@iconify-icons/lucide/zap';
import leafIcon from '@iconify-icons/lucide/leaf';
import shieldCheckIcon from '@iconify-icons/lucide/shield-check';
import usersIcon from '@iconify-icons/lucide/users';
import { useCountry } from '@/helpers/countryPreference';
import { merchantsHeroCopy } from './MerchantsHero.copy';
import './MerchantsHero.scss';

const benefitIcons = [checkCircleIcon, zapIcon, leafIcon, shieldCheckIcon];
const metricIcons = [usersIcon, zapIcon, shieldCheckIcon, null];

export default function MerchantsHero() {
  const copy = merchantsHeroCopy[useCountry()];
  return (
    <section className="merchants-hero" id="inicio" aria-labelledby="merchants-hero-title">
      <div className="merchants-hero__inner">
        <div className="merchants-hero__content">
          <span className="merchants-hero__badge"><Icon icon={storeIcon} aria-hidden="true" /> {copy.badge}</span>
          <h1 id="merchants-hero-title">{copy.headline[0]} <span>{copy.headline[1]}</span></h1>
          <p className="merchants-hero__description">{copy.description}</p>
          <div className="merchants-hero__actions">
            <Link href="/socios/registro" className="merchants-hero__button merchants-hero__button--primary"><Icon icon={storeIcon} aria-hidden="true" /> {copy.action} <Icon icon={arrowRightIcon} aria-hidden="true" /></Link>
          </div>
          <Link href="/usuarios" className="merchants-hero__customer-link">{copy.customerLink} <Icon icon={chevronRightIcon} aria-hidden="true" /></Link>
          <ul className="merchants-hero__benefits" aria-label="Beneficios para comercios">
            {copy.benefits.map((label, index) => <li key={label}><Icon icon={benefitIcons[index]} aria-hidden="true" />{label}</li>)}
          </ul>
        </div>
        <aside className="merchants-hero__partnership" aria-labelledby="merchants-partnership-title">
          <div className="merchants-hero__partnership-heading">
            <span className="merchants-hero__store-icon"><Icon icon={storeIcon} aria-hidden="true" /></span>
            <div><span className="merchants-hero__eyebrow">{copy.business}</span><h2 id="merchants-partnership-title">{copy.alliance}</h2></div>
            <span className="merchants-hero__status">{copy.status}</span>
          </div>
          <dl className="merchants-hero__metrics">
            {copy.metrics.map(([label, value], index) => (
              <div key={label}><dt>{label}</dt><dd>{value}{metricIcons[index] && <Icon icon={metricIcons[index]} aria-hidden="true" />}</dd></div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
