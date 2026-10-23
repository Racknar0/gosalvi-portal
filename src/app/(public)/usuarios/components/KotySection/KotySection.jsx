import Image from 'next/image';
import { Icon } from '@iconify/react/offline';
import awardIcon from '@iconify-icons/lucide/award';
import fireIcon from '@iconify-icons/fluent-emoji-flat/fire';
import seedlingIcon from '@iconify-icons/fluent-emoji-flat/seedling';
import teddyBearIcon from '@iconify-icons/fluent-emoji-flat/teddy-bear';
import './KotySection.scss';

const features = [
  { icon: fireIcon, title: 'Tu racha', description: 'Sumá días de rescate' },
  { icon: seedlingIcon, title: 'Tu impacto', description: 'Descubrí cuánto CO₂ evitás' },
  { icon: teddyBearIcon, title: 'Peluches Koty', description: 'Coleccionalos en la app' },
];

export default function KotySection() {
  return (
    <section className="koty-section" id="koty" aria-labelledby="koty-section-title">
      <div className="koty-section__panel">
        <picture className="koty-section__mascot">
          <source media="(prefers-reduced-motion: reduce)" srcSet="/assets/koty/celebrando.svg" />
          <Image src="/assets/koty/success.gif" alt="Koty celebrando un rescate de comida" width={336} height={336} unoptimized />
        </picture>
        <div className="koty-section__content">
          <span className="koty-section__badge"><Icon icon={awardIcon} aria-hidden="true" /> Conocé a Koty · Guardián de Salvi</span>
          <h2 id="koty-section-title">Cada rescate, una nueva aventura</h2>
          <p>Salvá packs, sumá experiencia y ayudá a Koty a subir de nivel.</p>
          <ul className="koty-section__features">
            {features.map(({ icon, title, description }) => (
              <li key={title}>
                <Icon icon={icon} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

