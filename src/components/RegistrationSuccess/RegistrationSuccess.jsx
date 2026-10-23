import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react/offline';
import checkIcon from '@iconify-icons/lucide/circle-check';
import { useCountry } from '@/helpers/countryPreference';
import { registrationSuccessCopy } from './RegistrationSuccess.copy';
import './RegistrationSuccess.scss';

export default function RegistrationSuccess({ email, business = false, verificationRequired = true }) {
  const copy = registrationSuccessCopy[useCountry()];
  return <section className="registration-success" aria-live="polite"><Icon className="registration-success__check" icon={checkIcon} aria-hidden="true" /><h2>{business ? copy.businessTitle : copy.title}</h2>{verificationRequired && <><p>{copy.email} <strong>{email}</strong>.</p><p>{copy.next}</p></>}{business ? <p>{copy.business}</p> : <><h3>{copy.app}</h3><div className="registration-success__qr"><Image src="/assets/app-download-preview.png" alt="QR de ejemplo: app Salvi próximamente" width={184} height={184} /><span>{copy.preview}</span></div><strong className="registration-success__soon">{copy.soon}</strong><p className="registration-success__note">{copy.note}</p></>}<div className="registration-success__actions">{business && <Link href="/socios/login" className="registration-success__primary">{copy.login}</Link>}{verificationRequired && <Link href="/reenviar-verificacion">{copy.resend}</Link>}<Link href={business ? '/comercios' : '/usuarios'}>{copy.home}</Link></div></section>;
}
