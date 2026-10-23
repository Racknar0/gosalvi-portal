import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react/offline';
import chevronRightIcon from '@iconify-icons/lucide/chevron-right';
import './UsersCategories.scss';

const categories = [
  { image: 'panaderias', alt: 'Medialunas, pan de masa madre y chipás sobre una tabla de madera', name: 'Panaderías y masas', description: 'Medialunas, panes de masa madre, facturas y chipás del día listos para disfrutar o calentar.', discount: 'Hasta 70% OFF' },
  { image: 'cafeterias', alt: 'Café con leche, croissant y cookie artesanal', name: 'Cafeterías de especialidad', description: 'Croissants, tostados, cookies artesanales y pastelería del día.', discount: 'Hasta 60% OFF' },
  { image: 'restaurantes', alt: 'Empanadas, pasta casera y tarta de verduras', name: 'Restaurantes y rotiserías', description: 'Pastas caseras, tartas gourmet, empanadas y platos elaborados en el día.', discount: 'Hasta 70% OFF' },
  { image: 'mercados', alt: 'Canasta de frutas y verduras frescas de estación', name: 'Mercados y fruterías', description: 'Canastas de estación, productos seleccionados y delicias naturales.', discount: 'Hasta 55% OFF' },
];

export default function UsersCategories() {
  return (
    <section className="users-categories" id="categorias" aria-labelledby="users-categories-title">
      <div className="users-categories__inner">
        <div className="users-categories__heading">
          <span>Variedad artesanal</span>
          <h2 id="users-categories-title">¿Qué tipo de comida vas a rescatar hoy?</h2>
        </div>
        <ul className="users-categories__grid">
          {categories.map(({ image, alt, name, description, discount }) => (
            <li key={name}>
              <Link className="users-categories__card" href="/descargar-app" aria-label={`${name}: ver locales en la app`}>
                <div className="users-categories__image">
                  <Image src={`/assets/categories/${image}.png`} alt={alt} fill sizes="(max-width: 560px) calc(100vw - 32px), (max-width: 1100px) calc((100vw - 72px) / 2), (max-width: 1328px) calc((100vw - 120px) / 4), 302px" />
                </div>
                <div className="users-categories__body">
                  <span className="users-categories__discount">{discount}</span>
                  <h3>{name}</h3>
                  <p>{description}</p>
                  <span className="users-categories__footer">Ver locales <Icon icon={chevronRightIcon} aria-hidden="true" /></span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

