import Image from 'next/image';
import Link from 'next/link';
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
import './UsersHero.scss';

export default function UsersHero() {
  return (
    <section className="users-hero" id="inicio" aria-labelledby="users-hero-title">
      <div className="users-hero__inner">
        <div className="users-hero__content">
          <h1 id="users-hero-title">
            Salvá comida rica con hasta un{' '}
            <span>70% de descuento</span>
          </h1>
          <p className="users-hero__description">
            Rescatá los excedentes del día de tus panaderías, cafeterías y restaurantes favoritos.
            Comida en perfecto estado, menos desperdicio y más ahorro para vos.
          </p>

          <div className="users-hero__actions">
            <Link className="users-hero__button users-hero__button--primary" href="/crear-cuenta">
              <Icon icon={userPlusIcon} aria-hidden="true" />
              Creá tu cuenta gratis
              <Icon className="users-hero__trailing-icon" icon={arrowRightIcon} aria-hidden="true" />
            </Link>
            <Link className="users-hero__button users-hero__button--download" href="/descargar-app">
              <Icon icon={smartphoneIcon} aria-hidden="true" />
              Descargá la app
              <Icon className="users-hero__trailing-icon" icon={downloadIcon} aria-hidden="true" />
            </Link>
          </div>

          <Link className="users-hero__merchant-link" href="/comercios/sumar-local">
            <span>¿Tenés un local? Sumate a Salvi</span>
            <Icon icon={chevronRightIcon} aria-hidden="true" />
          </Link>

          <ul className="users-hero__benefits" aria-label="Beneficios de Salvi">
            <li><Icon icon={circleCheckIcon} aria-hidden="true" /> Comida 100% fresca</li>
            <li><Icon icon={shieldCheckIcon} aria-hidden="true" /> Pago seguro</li>
            <li><Icon icon={leafIcon} aria-hidden="true" /> Impacto ecológico</li>
          </ul>
        </div>

        <div className="users-hero__visual">
          <div className="users-hero__card">
            <picture className="users-hero__mascot">
              <source media="(prefers-reduced-motion: reduce)" srcSet="/assets/koty/salvando.svg" />
              <Image src="/assets/koty/hello.gif" alt="Koty, la mascota de Salvi, saludando" width={360} height={360} unoptimized priority />
            </picture>

            <div className="users-hero__offer">
              <Icon icon={croissantIcon} aria-hidden="true" />
              <div>
                <p>Pack Panadería Artesanal</p>
                <span>70% OFF · Ahorrás $3.500</span>
              </div>
            </div>

            <div className="users-hero__quality">
              <span className="users-hero__quality-icon"><Icon icon={leafIcon} aria-hidden="true" /></span>
              <div>
                <p>100% Calidad del Día</p>
                <span>Cero desperdicio de comida</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

