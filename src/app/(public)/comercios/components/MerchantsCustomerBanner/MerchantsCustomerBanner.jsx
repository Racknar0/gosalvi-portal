import Link from 'next/link';
import { Icon } from '@iconify/react/offline';
import arrowRightIcon from '@iconify-icons/lucide/arrow-right';
import './MerchantsCustomerBanner.scss';

export default function MerchantsCustomerBanner() {
  return (
    <section className="merchants-customer-banner" aria-labelledby="merchants-customer-banner-title">
      <div className="merchants-customer-banner__inner">
        <div className="merchants-customer-banner__content">
          <span>¿Buscás comida con descuento?</span>
          <h2 id="merchants-customer-banner-title">Descubrí packs sorpresa en tu barrio con hasta <span>70% OFF</span></h2>
          <p>Explorá los locales cercanos, rescatá comida rica y ahorrá en cada compra.</p>
        </div>
        <Link href="/usuarios" className="merchants-customer-banner__button">Ver beneficios para vos <Icon icon={arrowRightIcon} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
