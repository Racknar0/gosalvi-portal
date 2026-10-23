'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react/offline';
import userPlusIcon from '@iconify-icons/lucide/user-plus';
import arrowRightIcon from '@iconify-icons/lucide/arrow-right';
import smartphoneIcon from '@iconify-icons/lucide/smartphone';
import downloadIcon from '@iconify-icons/lucide/download';
import chevronRightIcon from '@iconify-icons/lucide/chevron-right';
import circleCheckIcon from '@iconify-icons/lucide/circle-check';
import shieldCheckIcon from '@iconify-icons/lucide/shield-check';
import leafIcon from '@iconify-icons/lucide/leaf';
import croissantIcon from '@iconify-icons/fluent-emoji-flat/croissant';
import { useCountry } from '@/helpers/countryPreference';
import { usersHeroCopy } from './UsersHero.copy';
import './UsersHero.scss';

export default function UsersHero() {
  const copy = usersHeroCopy[useCountry()];
  return (
    <section
      className="users-hero"
      id="inicio"
      aria-labelledby="users-hero-title"
    >
      <div className="users-hero__inner">
        <div className="users-hero__content">
          <h1 id="users-hero-title">
            {copy.headline} <span>{copy.discount}</span>
          </h1>
          <p className="users-hero__description">{copy.description}</p>

          <div className="users-hero__actions">
            <Link
              href="/crear-cuenta"
              className="users-hero__button users-hero__button--primary"
            >
              <Icon icon={userPlusIcon} aria-hidden="true" />
              {copy.createAccount}
              <Icon
                className="users-hero__trailing-icon"
                icon={arrowRightIcon}
                aria-hidden="true"
              />
            </Link>
            <a
              role="link"
              aria-disabled="true"
              title="Función pendiente"
              className="users-hero__button users-hero__button--download"
            >
              <Icon icon={smartphoneIcon} aria-hidden="true" />
              {copy.download}
              <Icon
                className="users-hero__trailing-icon"
                icon={downloadIcon}
                aria-hidden="true"
              />
            </a>
          </div>

          <Link href="/socios/registro" className="users-hero__merchant-link">
            <span>{copy.merchantLink}</span>
            <Icon icon={chevronRightIcon} aria-hidden="true" />
          </Link>

          <ul className="users-hero__benefits" aria-label="Beneficios de Salvi">
            <li>
              <Icon icon={circleCheckIcon} aria-hidden="true" />{' '}
              {copy.benefits[0]}
            </li>
            <li>
              <Icon icon={shieldCheckIcon} aria-hidden="true" />{' '}
              {copy.benefits[1]}
            </li>
            <li>
              <Icon icon={leafIcon} aria-hidden="true" /> {copy.benefits[2]}
            </li>
          </ul>
        </div>

        <div className="users-hero__visual">
          <div className="users-hero__card">
            <picture className="users-hero__mascot">
              <source
                media="(prefers-reduced-motion: reduce)"
                srcSet="/assets/koty/salvando.svg"
              />
              <Image
                src="/assets/koty/hello.gif"
                alt="Koty, la mascota de Salvi, saludando"
                width={360}
                height={360}
                unoptimized
                priority
              />
            </picture>

            <div className="users-hero__offer">
              <Icon icon={croissantIcon} aria-hidden="true" />
              <div>
                <p>{copy.offer}</p>
                <span>{copy.savings}</span>
              </div>
            </div>

            <div className="users-hero__quality">
              <span className="users-hero__quality-icon">
                <Icon icon={leafIcon} aria-hidden="true" />
              </span>
              <div>
                <p>{copy.quality}</p>
                <span>{copy.qualityDetail}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
