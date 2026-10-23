import { Icon } from '@iconify/react/offline';
import usersIcon from '@iconify-icons/lucide/users';
import shieldCheckIcon from '@iconify-icons/lucide/shield-check';
import starIcon from '@iconify-icons/lucide/star';
import handshakeIcon from '@iconify-icons/lucide/handshake';
import zapIcon from '@iconify-icons/lucide/zap';
import clockIcon from '@iconify-icons/lucide/clock';
import './MerchantsBenefits.scss';

const benefits = [
  {
    icon: usersIcon,
    label: 'Fidelización',
    title: 'Que te conozcan y vuelvan',
    description: 'Cada retiro es una oportunidad para mostrar lo que hacés y cómo atendés. Conectá con vecinos que pueden convertirse en clientes habituales.',
  },
  {
    icon: shieldCheckIcon,
    label: 'Precios',
    title: 'Tu carta mantiene su valor',
    description: 'Ofrecé tus excedentes en packs sorpresa, sin rebajar productos específicos de tu carta. El cliente conoce la categoría y el valor del pack.',
  },
  {
    icon: starIcon,
    label: 'Tu marca',
    title: 'La misma calidad de siempre',
    description: 'Rescatá comida fresca del día y cuidá su presentación. Tu pack refleja el trabajo y la calidad que distinguen a tu local.',
  },
  {
    icon: handshakeIcon,
    label: 'Reseñas',
    title: 'La experiencia cuenta para ambos',
    description: 'El cliente califica su pack y vos podés valorar el retiro. Consultá las reseñas de cada pedido y contá con el apoyo de nuestro equipo.',
  },
  {
    icon: zapIcon,
    label: 'Mostrador',
    title: 'Entregas simples, sin cobrar',
    description: 'El pedido llega pagado desde la app. Prepará el pack, validá el retiro con QR o PIN y seguí con la atención de tu local.',
  },
  {
    icon: clockIcon,
    label: 'Flexibilidad',
    title: 'Vos manejás horarios y stock',
    description: 'Decidí cuántos packs publicar y cuándo se retiran. Si vendiste todo, no publicás; si quedan excedentes frescos, habilitás los que tengas.',
  },
];

export default function MerchantsBenefits() {
  return (
    <section className="merchants-benefits" id="beneficios-b2b" aria-labelledby="merchants-benefits-title">
      <div className="merchants-benefits__inner">
        <div className="merchants-benefits__heading">
          <span className="merchants-benefits__eyebrow">Beneficios para tu negocio</span>
          <h2 id="merchants-benefits-title">Cuidá tus precios, tu tiempo y tu marca</h2>
          <p>Sumá clientes y aprovechá tus excedentes sin complicar el día a día de tu local.</p>
        </div>
        <ul className="merchants-benefits__grid">
          {benefits.map(({ icon, label, title, description }) => (
            <li className="merchants-benefits__card" key={label}>
              <div className="merchants-benefits__card-top">
                <span className="merchants-benefits__icon"><Icon icon={icon} aria-hidden="true" /></span>
                <span className="merchants-benefits__label">{label}</span>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
