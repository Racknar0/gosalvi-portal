'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react/offline';
import arrowRightIcon from '@iconify-icons/lucide/arrow-right';
import './MerchantsCustomerBanner.scss';
import { useCountry } from '@/helpers/countryPreference';
import { merchantsCustomerBannerCopy } from './MerchantsCustomerBanner.copy';

export default function MerchantsCustomerBanner() {
  const copy = merchantsCustomerBannerCopy[useCountry()];
  return (
    <section
      className="merchants-customer-banner"
      aria-labelledby="merchants-customer-banner-title"
    >
      <div className="merchants-customer-banner__inner">
        <div className="merchants-customer-banner__content">
          <span>{copy.label}</span>
          <h2 id="merchants-customer-banner-title">
            {copy.title} <span>{copy.discount}</span>
          </h2>
          <p>{copy.description}</p>
        </div>
        <Link href="/usuarios" className="merchants-customer-banner__button">
          {copy.action} <Icon icon={arrowRightIcon} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
