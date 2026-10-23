'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react/offline';
import arrowLeftIcon from '@iconify-icons/lucide/arrow-left';
import storeIcon from '@iconify-icons/lucide/store';
import usersIcon from '@iconify-icons/lucide/users';
import shieldIcon from '@iconify-icons/lucide/shield-check';
import clockIcon from '@iconify-icons/lucide/clock';
import PartnerAuthOptions from '../../../components/PartnerAuthOptions/PartnerAuthOptions';
import PartnerLoginForm from '../PartnerLoginForm/PartnerLoginForm';
import './PartnerLoginScreen.scss';
import { useCountry } from '@/helpers/countryPreference';
import { partnerLoginCopy } from './PartnerLoginScreen.copy';

export default function PartnerLoginScreen() {
  const copy = partnerLoginCopy[useCountry()];
  return (
    <section
      className="partner-portal__view partner-sign-in"
      aria-labelledby="partner-page-title"
    >
      <Link href="/comercios" className="partner-sign-in__back">
        <Icon icon={arrowLeftIcon} aria-hidden="true" />
        {copy.back}
      </Link>
      <header className="partner-sign-in__intro">
        <h1 id="partner-page-title">{copy.title}</h1>
        <p>{copy.description}</p>
        <ul>
          <li>
            <Icon icon={usersIcon} aria-hidden="true" />
            {copy.benefits[0]}
          </li>
          <li>
            <Icon icon={shieldIcon} aria-hidden="true" />
            {copy.benefits[1]}
          </li>
          <li>
            <Icon icon={clockIcon} aria-hidden="true" />
            {copy.benefits[2]}
          </li>
        </ul>
      </header>
      <div className="partner-portal__card partner-sign-in__card">
        <header className="partner-sign-in__heading">
          <div>
            <h2>{copy.login}</h2>
            <span className="partner-sign-in__badge">
              <Icon icon={storeIcon} aria-hidden="true" />
              Salvi Socios
            </span>
          </div>
          <p>{copy.account}</p>
        </header>
        <PartnerAuthOptions />
        <PartnerLoginForm />
        <p className="partner-sign-in__register">
          {copy.registerPrompt}{' '}
          <Link href="/socios/registro">{copy.registerLink}</Link>
        </p>
        <p className="partner-sign-in__privacy">
          <Icon icon={shieldIcon} aria-hidden="true" />
          {copy.privacy}
        </p>
      </div>
    </section>
  );
}
