import Link from 'next/link';
import { Icon } from '@iconify/react/offline';
import storeIcon from '@iconify-icons/lucide/store';
import arrowRightIcon from '@iconify-icons/lucide/arrow-right';
import downloadIcon from '@iconify-icons/lucide/download';
import chevronRightIcon from '@iconify-icons/lucide/chevron-right';
import checkCircleIcon from '@iconify-icons/lucide/circle-check';
import zapIcon from '@iconify-icons/lucide/zap';
import leafIcon from '@iconify-icons/lucide/leaf';
import shieldCheckIcon from '@iconify-icons/lucide/shield-check';
import usersIcon from '@iconify-icons/lucide/users';
import './MerchantsHero.scss';

const benefits = [
  { icon: checkCircleIcon, label: 'Clientes reales' },
  { icon: zapIcon, label: 'Despacho en 3 s' },
  { icon: leafIcon, label: 'Cuidamos tu marca' },
  { icon: shieldCheckIcon, label: '$0 costo fijo' },
];

const partnership = [
  { label: 'Nuevos vecinos a mostrador', value: '80% descubren tu local', icon: usersIcon },
  { label: 'Despacho en mostrador', value: 'Ágil en 3 segundos', icon: zapIcon },
  { label: 'Protección de precios', value: 'Carta 100% blindada', icon: shieldCheckIcon },
  { label: 'Costo fijo de adhesión', value: '$0 (sin costos fijos)' },
];

export default function MerchantsHero() {
  return (
    <section className="merchants-hero" id="inicio" aria-labelledby="merchants-hero-title">
      <div className="merchants-hero__inner">
        <div className="merchants-hero__content">
          <span className="merchants-hero__badge"><Icon icon={storeIcon} aria-hidden="true" /> Salvi Socios · «Competimos contra tu merma, no contra tu negocio»</span>
          <h1 id="merchants-hero-title">Llená tu mostrador de <span>nuevos clientes y cero mermas</span></h1>
          <p className="merchants-hero__description">Convertí los excedentes frescos del día en nuevos vecinos que conocen tu local, prueban lo que hacés y regresan a consumir a precio normal de carta. Sin alterar el ritmo de tu cocina, sin costos fijos y cuidando el prestigio de tu marca en cada detalle.</p>
          <div className="merchants-hero__actions">
            <Link href="/comercios/sumar-local" className="merchants-hero__button merchants-hero__button--primary"><Icon icon={storeIcon} aria-hidden="true" /> Postular mi comercio <Icon icon={arrowRightIcon} aria-hidden="true" /></Link>
            <Link href="/descargar-app" className="merchants-hero__button merchants-hero__button--download"><Icon icon={downloadIcon} aria-hidden="true" /> Descargá la app</Link>
          </div>
          <Link href="/usuarios" className="merchants-hero__customer-link">¿Buscás comprar comida con descuento? Mirá los beneficios para vos <Icon icon={chevronRightIcon} aria-hidden="true" /></Link>
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
          <Link href="/comercios/sumar-local" className="merchants-hero__button merchants-hero__button--join">Sumar mi comercio ahora <Icon icon={arrowRightIcon} aria-hidden="true" /></Link>
        </aside>
      </div>
    </section>
  );
}
