'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Icon } from '@iconify/react/offline';
import avocadoIcon from '@iconify-icons/fluent-emoji-flat/avocado';
import shopIcon from '@iconify-icons/fluent-emoji-flat/convenience-store';
import chevronDownIcon from '@iconify-icons/lucide/chevron-down';
import storeIcon from '@iconify-icons/lucide/store';
import userPlusIcon from '@iconify-icons/lucide/user-plus';
import plusIcon from '@iconify-icons/lucide/plus';
import logInIcon from '@iconify-icons/lucide/log-in';
import menuIcon from '@iconify-icons/lucide/menu';
import closeIcon from '@iconify-icons/lucide/x';
import pawPrintIcon from '@iconify-icons/lucide/paw-print';
import CountrySelector from '@/components/CountrySelector/CountrySelector';
import { useCountry } from '@/helpers/countryPreference';
import { publicHeaderCopy } from './PublicHeader.copy';
import './PublicHeader.scss';

const customerLinks = [
  { label: 'Inicio', href: '/usuarios#inicio' },
  { label: 'Cómo funciona', href: '/usuarios#como-funciona' },
  { label: 'Qué podés rescatar', href: '/usuarios#categorias' },
  { label: 'Dudas frecuentes', href: '/usuarios#faq' },
];

const merchantLinks = [
  { label: 'Inicio', href: '/comercios#inicio' },
  { label: 'Beneficios', href: '/comercios#beneficios-b2b' },
  { label: 'Cómo funciona', href: '/comercios#como-funciona' },
  { label: 'Dudas frecuentes', href: '/comercios#faq' },
];

function subscribeToHash(onChange) {
  window.addEventListener('hashchange', onChange);
  window.addEventListener('popstate', onChange);
  return () => {
    window.removeEventListener('hashchange', onChange);
    window.removeEventListener('popstate', onChange);
  };
}

const getHash = () => window.location.hash || '#inicio';
const getServerHash = () => '#inicio';

export default function PublicHeader() {
  const copy = publicHeaderCopy[useCountry()];
  const pathname = usePathname();
  const hash = useSyncExternalStore(subscribeToHash, getHash, getServerHash);
  const [menuOpen, setMenuOpen] = useState(false);
  const [businessOpen, setBusinessOpen] = useState(false);
  const businessRef = useRef(null);
  const menuToggleRef = useRef(null);
  const merchant =
    pathname.startsWith('/comercios') || pathname.startsWith('/socios');
  const links = (merchant ? merchantLinks : customerLinks).map(
    (link, index) => ({
      ...link,
      label: (merchant ? copy.merchantNav : copy.customerNav)[index],
    }),
  );
  const closeMenu = () => {
    setMenuOpen(false);
    setBusinessOpen(false);
  };

  useEffect(() => {
    if (!menuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuToggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [menuOpen]);

  useEffect(() => {
    if (!businessOpen) return;

    const handlePointerDown = (event) => {
      if (!businessRef.current?.contains(event.target)) setBusinessOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setBusinessOpen(false);
        businessRef.current?.querySelector('button')?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [businessOpen]);

  return (
    <header className="public-header">
      <div className="public-header__inner">
        <Link
          className="public-header__brand"
          href="/usuarios"
          aria-label="Salvi, inicio"
          onClick={closeMenu}
        >
          <Image
            src="/assets/brand/salvi.svg"
            alt="Salvi · Salvá Comida"
            width={150}
            height={50}
            priority
          />
        </Link>

        <nav
          className="public-header__audience"
          aria-label="Experiencias Salvi"
        >
          <Link
            className={!merchant ? 'is-active' : ''}
            href="/usuarios"
            onClick={closeMenu}
            aria-current={pathname === '/usuarios' ? 'page' : undefined}
          >
            <Icon
              className="public-header__audience-icon"
              icon={avocadoIcon}
              aria-hidden="true"
            />{' '}
            {copy.audience[0]}
          </Link>
          <Link
            className={merchant ? 'is-active' : ''}
            href="/comercios"
            onClick={closeMenu}
            aria-current={pathname === '/comercios' ? 'page' : undefined}
          >
            <Icon
              className="public-header__audience-icon"
              icon={shopIcon}
              aria-hidden="true"
            />{' '}
            {copy.audience[1]}
          </Link>
        </nav>

        <div className="public-header__actions">
          {merchant ? (
            <div
              className="public-header__business"
              ref={businessRef}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget))
                  setBusinessOpen(false);
              }}
            >
              <button
                className="public-header__primary public-header__primary--merchant"
                type="button"
                aria-expanded={businessOpen}
                aria-controls="business-navigation"
                onClick={() => setBusinessOpen((open) => !open)}
              >
                <Icon
                  className="public-header__action-icon"
                  icon={storeIcon}
                  aria-hidden="true"
                />
                {copy.businessButton}
                <Icon
                  className={`public-header__chevron ${businessOpen ? 'is-open' : ''}`}
                  icon={chevronDownIcon}
                  aria-hidden="true"
                />
              </button>
              {businessOpen && (
                <nav
                  className="public-header__business-menu"
                  id="business-navigation"
                  aria-label={copy.ariaBusinessMenu}
                >
                  <Link href="/socios/registro" onClick={closeMenu}>
                    <strong>
                      {copy.businessStart}{' '}
                      <Icon icon={plusIcon} aria-hidden="true" />
                    </strong>
                    <span>{copy.businessStartHint}</span>
                  </Link>
                  <Link href="/socios/login" onClick={closeMenu}>
                    <strong>
                      {copy.portal} <Icon icon={logInIcon} aria-hidden="true" />
                    </strong>
                    <span>{copy.portalHint}</span>
                  </Link>
                </nav>
              )}
            </div>
          ) : (
            <Link
              href="/crear-cuenta"
              className="public-header__primary"
              onClick={closeMenu}
            >
              <Icon
                className="public-header__action-icon"
                icon={userPlusIcon}
                aria-hidden="true"
              />{' '}
              {copy.customerAccount}
            </Link>
          )}
          <CountrySelector className="country-selector--desktop" />
          <button
            ref={menuToggleRef}
            className="public-header__menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            aria-controls="public-mobile-panel"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon icon={menuOpen ? closeIcon : menuIcon} aria-hidden="true" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <button
          className="public-header__scrim"
          type="button"
          aria-label="Cerrar menú"
          onClick={closeMenu}
        />
      )}
      <div
        id="public-mobile-panel"
        className={`public-header__secondary ${menuOpen ? 'is-open' : ''}`}
        aria-label="Menú principal"
      >
        <div className="public-header__drawer-heading">
          <span>Menú</span>
          <button
            className="public-header__drawer-close"
            type="button"
            aria-label="Cerrar menú"
            onClick={closeMenu}
          >
            <Icon icon={closeIcon} aria-hidden="true" />
          </button>
        </div>
        <div className="public-header__country-row">
          <span>País</span>
          <CountrySelector className="country-selector--mobile" />
        </div>
        <nav
          className="public-header__audience public-header__mobile-audience"
          aria-label={copy.experienceLabel}
        >
          <Link
            className={!merchant ? 'is-active' : ''}
            href="/usuarios"
            onClick={() => setBusinessOpen(false)}
            aria-current={pathname === '/usuarios' ? 'page' : undefined}
          >
            <Icon
              className="public-header__audience-icon"
              icon={avocadoIcon}
              aria-hidden="true"
            />{' '}
            {copy.audience[0]}
          </Link>
          <Link
            className={merchant ? 'is-active' : ''}
            href="/comercios"
            onClick={() => setBusinessOpen(false)}
            aria-current={pathname === '/comercios' ? 'page' : undefined}
          >
            <Icon
              className="public-header__audience-icon"
              icon={shopIcon}
              aria-hidden="true"
            />{' '}
            {copy.audience[1]}
          </Link>
        </nav>
        <nav
          id="public-navigation"
          className="public-header__links"
          aria-label={copy.ariaNav[merchant ? 1 : 0]}
        >
          <a
            role="link"
            aria-disabled="true"
            title="Función pendiente"
            className="public-header__download"
            aria-label={copy.downloadLabel}
          >
            <span className="public-header__platforms" aria-hidden="true">
              <Image
                src="/assets/stores/google-play.png"
                alt=""
                width={20}
                height={20}
              />
              <Image
                src="/assets/stores/app-store.webp"
                alt=""
                width={20}
                height={20}
              />
            </span>
            {copy.download}
          </a>
          <div className="public-header__sections">
            {links.map(({ label, href }) => (
              <a
                href={href}
                key={href}
                onClick={closeMenu}
                aria-current={
                  hash === `#${href.split('#')[1]}` ? 'location' : undefined
                }
              >
                {label}
              </a>
            ))}
          </div>
          <div className="public-header__mobile-actions">
            {merchant ? (
              <>
                <span>{copy.mobileBusiness}</span>
                <Link
                  href="/socios/registro"
                  className="public-header__primary public-header__primary--merchant"
                  onClick={closeMenu}
                >
                  <Icon icon={storeIcon} aria-hidden="true" />{' '}
                  {copy.mobileLinks[0]}
                </Link>
                <Link href="/socios/login" onClick={closeMenu}>
                  <Icon icon={logInIcon} aria-hidden="true" />{' '}
                  {copy.mobileLinks[1]}
                </Link>
              </>
            ) : (
              <Link
                href="/crear-cuenta"
                className="public-header__primary"
                onClick={closeMenu}
              >
                <Icon icon={userPlusIcon} aria-hidden="true" />{' '}
                {copy.customerAccount}
              </Link>
            )}
          </div>
          <a
            className="public-header__koty"
            href="/usuarios#koty"
            onClick={closeMenu}
            aria-current={
              !merchant && hash === '#koty' ? 'location' : undefined
            }
          >
            <Icon icon={pawPrintIcon} aria-hidden="true" />
            {copy.koty}
          </a>
        </nav>
      </div>
    </header>
  );
}
