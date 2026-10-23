"use client";

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
  const pathname = usePathname();
  const hash = useSyncExternalStore(subscribeToHash, getHash, getServerHash);
  const [menuOpen, setMenuOpen] = useState(false);
  const [businessOpen, setBusinessOpen] = useState(false);
  const businessRef = useRef(null);
  const merchant = pathname.startsWith('/comercios');
  const links = merchant ? merchantLinks : customerLinks;
  const closeMenu = () => {
    setMenuOpen(false);
    setBusinessOpen(false);
  };

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
        <Link className="public-header__brand" href="/" aria-label="Salvi, inicio" onClick={closeMenu}>
          <Image src="/assets/brand/salvi.svg" alt="Salvi · Salvá Comida" width={150} height={50} priority />
        </Link>

        <nav className="public-header__audience" aria-label="Experiencias Salvi">
          <Link className={!merchant ? 'is-active' : ''} href="/usuarios" onClick={closeMenu} aria-current={pathname === '/usuarios' ? 'page' : undefined}>
            <Icon className="public-header__audience-icon" icon={avocadoIcon} aria-hidden="true" /> Para vos
          </Link>
          <Link className={merchant ? 'is-active' : ''} href="/comercios" onClick={closeMenu} aria-current={pathname === '/comercios' ? 'page' : undefined}>
            <Icon className="public-header__audience-icon" icon={shopIcon} aria-hidden="true" /> Para tu negocio
          </Link>
        </nav>

        <div className="public-header__actions">
          {merchant ? (
            <div className="public-header__business" ref={businessRef} onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setBusinessOpen(false);
            }}>
              <button className="public-header__primary public-header__primary--merchant" type="button" aria-expanded={businessOpen} aria-controls="business-navigation" onClick={() => setBusinessOpen((open) => !open)}>
                <Icon className="public-header__action-icon" icon={storeIcon} aria-hidden="true" />
                Mi local en Salvi
                <Icon className={`public-header__chevron ${businessOpen ? 'is-open' : ''}`} icon={chevronDownIcon} aria-hidden="true" />
              </button>
              {businessOpen && (
                <nav className="public-header__business-menu" id="business-navigation" aria-label="Mi local en Salvi">
                  <Link href="/comercios/sumar-local" onClick={closeMenu}>
                    <strong>Sumá tu local <Icon icon={plusIcon} aria-hidden="true" /></strong>
                    <span>Quiero empezar a vender en Salvi.</span>
                  </Link>
                  <Link href="/comercios/portal-socios" onClick={closeMenu}>
                    <strong>Entrá al portal <Icon icon={logInIcon} aria-hidden="true" /></strong>
                    <span>Ya soy comercio aliado.</span>
                  </Link>
                </nav>
              )}
            </div>
          ) : (
            <Link className="public-header__primary" href="/crear-cuenta" onClick={closeMenu}>
              <Icon className="public-header__action-icon" icon={userPlusIcon} aria-hidden="true" /> Creá tu cuenta
            </Link>
          )}
          <button className="public-header__menu-toggle" type="button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} aria-controls="public-navigation" onClick={() => setMenuOpen((open) => !open)}>
            <Icon icon={menuOpen ? closeIcon : menuIcon} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className={`public-header__secondary ${menuOpen ? 'is-open' : ''}`}>
        <nav id="public-navigation" className="public-header__links" aria-label={merchant ? 'Navegación para comercios' : 'Navegación para usuarios'}>
          <Link className="public-header__download" href="/descargar-app" onClick={closeMenu} aria-label="Descargá la app en Google Play o App Store" aria-current={pathname === '/descargar-app' ? 'page' : undefined}>
            <span className="public-header__platforms" aria-hidden="true">
              <Image src="/assets/stores/google-play.png" alt="" width={20} height={20} />
              <Image src="/assets/stores/app-store.webp" alt="" width={20} height={20} />
            </span>
            Descargá la app
          </Link>
          <div className="public-header__sections">
          {links.map(({ label, href }) => (
            <a href={href} key={href} onClick={closeMenu} aria-current={hash === `#${href.split('#')[1]}` ? 'location' : undefined}>
              {label}
            </a>
          ))}
          </div>
          <a className="public-header__koty" href="/usuarios#koty" onClick={closeMenu} aria-current={!merchant && hash === '#koty' ? 'location' : undefined}>
            <Icon icon={pawPrintIcon} aria-hidden="true" />
            Conocé a Koty
          </a>
        </nav>
      </div>
    </header>
  );
}

