import Image from 'next/image';
import './PartnerAuthOptions.scss';

export default function PartnerAuthOptions({ register = false }) {
  return (
    <div className="partner-auth-options">
      <button type="button" className="partner-auth-options__google" disabled title="El acceso con Google todavía no está conectado"><Image src="/assets/socials/google.svg" alt="" width={20} height={20} />{register ? 'Registrarme con Google' : 'Continuar con Google'}</button>
      <div className="partner-auth-options__divider">{register ? 'o completá los datos de tu comercio' : 'o ingresá con tus credenciales'}</div>
    </div>
  );
}
