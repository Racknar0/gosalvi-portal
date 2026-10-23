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
import './MerchantsHero.scss';

const benefits = [
  { icon: checkCircleIcon, label: 'Clientes reales' },
  { icon: zapIcon, label: 'Retiro ágil' },
  { icon: leafIcon, label: 'Cuidamos tu marca' },
  { icon: shieldCheckIcon, label: '$0 costo fijo' },
];

const partnership = [
  { label: 'Nuevos clientes', value: 'Más vecinos conocen tu local', icon: usersIcon },
  { label: 'Retiro en el local', value: 'Simple y ágil', icon: zapIcon },
  { label: 'Tus precios', value: 'Cuidamos el valor de tu carta', icon: shieldCheckIcon },
  { label: 'Costo fijo', value: '$0 (sin costos fijos)' },
];

export default function MerchantsHero() {
  return (
    <section className="merchants-hero" id="inicio" aria-labelledby="merchants-hero-title">
      <div className="merchants-hero__inner">
        <div className="merchants-hero__content">
          <span className="merchants-hero__badge"><Icon icon={storeIcon} aria-hidden="true" /> Salvi Socios · «Competimos contra tu merma, no contra tu negocio»</span>
          <h1 id="merchants-hero-title">Llená tu mostrador de <span>nuevos clientes</span></h1>
          <p className="merchants-hero__description">Convertí los excedentes del día en nuevos clientes para tu local. Sin cambiar el ritmo de tu cocina, sin costos fijos y cuidando tu marca.</p>
          <div className="merchants-hero__actions">
            <Link href="/comercios/sumar-local" className="merchants-hero__button merchants-hero__button--primary"><Icon icon={storeIcon} aria-hidden="true" /> Sumá tu local <Icon icon={arrowRightIcon} aria-hidden="true" /></Link>
          </div>
          <Link href="/usuarios" className="merchants-hero__customer-link">¿Buscás comida con descuento? Entrá acá <Icon icon={chevronRightIcon} aria-hidden="true" /></Link>
          <ul className="merchants-hero__benefits" aria-label="Beneficios para comercios">
            {benefits.map(({ icon, label }) => <li key={label}><Icon icon={icon} aria-hidden="true" />{label}</li>)}
          </ul>
        </div>
        <aside className="merchants-hero__partnership" aria-labelledby="merchants-partnership-title">
          <div className="merchants-hero__partnership-heading">
            <span className="merchants-hero__store-icon"><Icon icon={storeIcon} aria-hidden="true" /></span>
            <div><span className="merchants-hero__eyebrow">Tu local gastronómico</span><h2 id="merchants-partnership-title">Alianza con Salvi</h2></div>
            <span className="merchants-hero__status">Socio oficial</span>
          </div>
          <dl className="merchants-hero__metrics">
            {partnership.map(({ label, value, icon }) => (
              <div key={label}><dt>{label}</dt><dd>{value}{icon && <Icon icon={icon} aria-hidden="true" />}</dd></div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
