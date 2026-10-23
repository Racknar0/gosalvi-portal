'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react/offline';
import storeIcon from '@iconify-icons/lucide/store';
import sproutIcon from '@iconify-icons/lucide/sprout';
import { useCountry } from '@/helpers/countryPreference';
import { publicFooterCopy } from './PublicFooter.copy';
import './PublicFooter.scss';

const socials = [
  { name: 'Facebook', asset: 'facebook' },
  {
    name: 'Instagram',
    asset: 'instagram',
    href: 'https://instagram.com/gosalvi',
  },
  { name: 'TikTok', asset: 'tiktok' },
  {
    name: 'LinkedIn',
    asset: 'linkedin',
    href: 'https://www.linkedin.com/company/gosalvi',
  },
];

const groups = [
  {
    title: 'Comercios aliados',
    links: [
      {
        label: 'Quiero sumar mi local',
        href: '/socios/registro',
        icon: storeIcon,
        primary: true,
      },
      { label: 'Ingresá al portal', href: '/socios/login' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Términos y condiciones del servicio', href: '/terminos' },
      { label: 'Política de privacidad y cookies', href: '/privacidad' },
      { label: 'Baja de cuenta y datos personales', href: '/eliminar-cuenta' },
    ],
  },
];

export default function PublicFooter() {
  const copy = publicFooterCopy[useCountry()];
  return (
    <footer className="public-footer">
      <div className="public-footer__inner">
        <div className="public-footer__columns">
          <div className="public-footer__brand">
            <Link href="/usuarios" aria-label="Salvi, inicio">
              <Image
                src="/assets/brand/salvi.svg"
                alt="Salvi"
                width={110}
                height={38}
              />
            </Link>
            <p>{copy.description}</p>
            <div className="public-footer__socials">
              {socials.map(({ name, asset, href }) =>
                href ? (
                  <a
                    key={asset}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${name} de Salvi`}
                  >
                    <Image
                      src={`/assets/socials/${asset}.svg`}
                      alt=""
                      width={18}
                      height={18}
                    />
                  </a>
                ) : (
                  <span
                    key={asset}
                    className="public-footer__social-pending"
                    role="img"
                    aria-label={`${name} de Salvi: enlace pendiente`}
                    title={`${name}: enlace pendiente`}
                  >
                    <Image
                      src={`/assets/socials/${asset}.svg`}
                      alt=""
                      width={18}
                      height={18}
                    />
                  </span>
                ),
              )}
            </div>
          </div>
          {groups.map(({ title, links }) => (
            <nav key={title} aria-label={title}>
              <h2>{title}</h2>
              <ul>
                {links.map(({ label, href, icon, primary }) => (
                  <li key={label}>
                    {href ? (
                      <Link
                        href={href}
                        className={
                          primary ? 'public-footer__highlight' : undefined
                        }
                      >
                        {icon && <Icon icon={icon} aria-hidden="true" />}
                        <span>{label}</span>
                      </Link>
                    ) : (
                      <span
                        role="link"
                        aria-disabled="true"
                        title="Función pendiente"
                        className={
                          primary ? 'public-footer__highlight' : undefined
                        }
                      >
                        {icon && <Icon icon={icon} aria-hidden="true" />}
                        <span>{label}</span>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="public-footer__bottom">
          <p>© 2026 Salvi Food Technologies. Todos los derechos reservados.</p>
          <p>
            {copy.slogan} <Icon icon={sproutIcon} aria-hidden="true" />
          </p>
        </div>
      </div>
    </footer>
  );
}
