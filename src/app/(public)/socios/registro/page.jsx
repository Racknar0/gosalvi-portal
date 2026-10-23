'use client';

import Link from 'next/link';
import PartnerRegistrationForm from './components/PartnerRegistrationForm/PartnerRegistrationForm';
import PartnerAuthOptions from '../components/PartnerAuthOptions/PartnerAuthOptions';
import { useCountry } from '@/helpers/countryPreference';

export default function PartnerRegistroPage() {
  const colombia = useCountry() === 'CO';
  return (
    <section className="partner-portal__view partner-portal__view--registro" aria-labelledby="partner-page-title">
      <header className="partner-portal__intro">
        <span className="partner-portal__kicker">Salvi · {colombia ? 'Portal de negocios' : 'Portal de comercios'}</span>
        <h1 id="partner-page-title">{colombia ? 'Registra tu negocio en Salvi' : 'Registrá tu comercio en Salvi'}</h1>
        <p>{colombia ? 'Cuéntanos sobre tu negocio para empezar a ofrecer tus productos.' : 'Contanos sobre tu negocio para empezar a rescatar tus excedentes.'}</p>
        <p className="partner-portal__switch">{colombia ? '¿Ya tienes un negocio registrado?' : '¿Ya tenés un comercio registrado?'} <Link href="/socios/login">{colombia ? 'Ingresa' : 'Iniciá sesión'}</Link></p>
      </header>
      <div className="partner-portal__card">
        <PartnerAuthOptions register />
        <PartnerRegistrationForm />
      </div>
    </section>
  );
}
