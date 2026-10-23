import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react/offline';
import instagramIcon from '@iconify-icons/lucide/instagram';
import linkedinIcon from '@iconify-icons/lucide/linkedin';
import globeIcon from '@iconify-icons/lucide/globe';
import userPlusIcon from '@iconify-icons/lucide/user-plus';
import smartphoneIcon from '@iconify-icons/lucide/smartphone';
import storeIcon from '@iconify-icons/lucide/store';
import sproutIcon from '@iconify-icons/lucide/sprout';
import './PublicFooter.scss';

const groups = [
  {
    title: 'Para clientes',
    links: [
      { label: 'Crear cuenta de cliente', href: '/crear-cuenta', icon: userPlusIcon, primary: true },
      { label: 'Descargar app móvil', href: '/descargar-app', icon: smartphoneIcon },
      { label: 'Cómo funciona el rescate', href: '/usuarios#como-funciona' },
      { label: 'Comercios y categorías', href: '/usuarios#categorias' },
    ],
  },
  {
    title: 'Comercios aliados',
    links: [
      { label: 'Sumar un local (postulación)', href: '/comercios/sumar-local', icon: storeIcon, primary: true },
      { label: 'Descargar app Salvi', href: '/descargar-app', icon: smartphoneIcon },
      { label: 'Portal de socios', href: '/comercios/portal-socios' },
      { label: 'Beneficios y rentabilidad B2B', href: '/comercios#beneficios-b2b' },
      { label: 'Cómo funciona en mostrador', href: '/comercios#como-funciona' },
    ],
  },
  {
    title: 'Institucional & legal',
    links: [
      { label: 'Términos y condiciones del servicio', href: '/terminos' },
      { label: 'Política de privacidad y cookies', href: '/privacidad' },
      { label: 'Baja de cuenta y datos personales', href: '/eliminar-cuenta' },
    ],
  },
];

export default function PublicFooter() {
  return (
    <footer className="public-footer">
      <div className="public-footer__inner">
        <div className="public-footer__columns">
          <div className="public-footer__brand">
            <Link href="/" aria-label="Salvi, inicio"><Image src="/assets/brand/salvi.svg" alt="Salvi" width={110} height={38} /></Link>
            <p>Plataforma tecnológica de rescate gastronómico, sustentabilidad alimentaria y ahorro familiar.</p>
            <div className="public-footer__socials">
              <a href="https://instagram.com/gosalvi" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Salvi"><Icon icon={instagramIcon} aria-hidden="true" /></a>
              <a href="https://www.linkedin.com/company/gosalvi" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn de Salvi"><Icon icon={linkedinIcon} aria-hidden="true" /></a>
              <Link href="/" aria-label="Sitio web de Salvi"><Icon icon={globeIcon} aria-hidden="true" /></Link>
            </div>
          </div>
          {groups.map(({ title, links }) => (
            <nav key={title} aria-label={title}>
              <h2>{title}</h2>
              <ul>
                {links.map(({ label, href, icon, primary }) => (
                  <li key={href}>
                    <Link href={href} className={primary ? 'public-footer__highlight' : undefined}>
                      {icon && <Icon icon={icon} aria-hidden="true" />}
                      <span>{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="public-footer__bottom">
          <p>© 2026 Salvi Food Technologies. Todos los derechos reservados.</p>
          <p>Salvá comida deliciosa, cuidá tu bolsillo y enfriá el planeta <Icon icon={sproutIcon} aria-hidden="true" /></p>
        </div>
      </div>
    </footer>
  );
}
