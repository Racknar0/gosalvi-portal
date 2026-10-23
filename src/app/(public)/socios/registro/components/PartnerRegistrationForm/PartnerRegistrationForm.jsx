'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { Icon } from '@iconify/react/offline';
import coffeeEmoji from '@iconify-icons/fluent-emoji-flat/hot-beverage';
import chocolateEmoji from '@iconify-icons/fluent-emoji-flat/chocolate-bar';
import breadEmoji from '@iconify-icons/fluent-emoji-flat/baguette-bread';
import teaEmoji from '@iconify-icons/fluent-emoji-flat/teacup-without-handle';
import chevronDownIcon from '@iconify-icons/lucide/chevron-down';
import storeIcon from '@iconify-icons/lucide/store';
import branchIcon from '@iconify-icons/lucide/git-branch';
import buildingIcon from '@iconify-icons/lucide/building-2';
import shieldIcon from '@iconify-icons/lucide/shield-check';
import clockIcon from '@iconify-icons/lucide/clock';
import checkIcon from '@iconify-icons/lucide/circle-check';
import infoIcon from '@iconify-icons/lucide/info';
import plusIcon from '@iconify-icons/lucide/plus';
import trashIcon from '@iconify-icons/lucide/trash-2';
import sparklesIcon from '@iconify-icons/lucide/sparkles';
import RequiredMark from '@/components/RequiredMark/RequiredMark';
import PhoneField from '@/components/PhoneField/PhoneField';
import PartnerAddress from '../PartnerAddress/PartnerAddress';
import './PartnerRegistrationForm.scss';
import { useCountry } from '@/helpers/countryPreference';
import { partnerRegistrationCopy } from './PartnerRegistrationForm.copy';
import FormNotice from '@/components/FormNotice/FormNotice';
import PasswordField from '@/components/PasswordField/PasswordField';
import RegistrationSuccess from '@/components/RegistrationSuccess/RegistrationSuccess';
import { registerBusiness, authError } from '@/services/AuthService';

const businessModels = [
  { value: 'direct_store', icon: storeIcon },
  { value: 'franchisee', icon: branchIcon },
  { value: 'franchisor', icon: buildingIcon },
  { value: 'holding', icon: buildingIcon },
];

const franchiseBrands = [
  { value: 'Dulce Hora', label: 'Dulce Hora (Cafetería & Delicias)', icon: coffeeEmoji },
  { value: 'Havanna', label: 'Havanna', icon: chocolateEmoji },
  { value: 'Café Martínez', label: 'Café Martínez', icon: coffeeEmoji },
  { value: 'Costumbres Argentinas', label: 'Costumbres Argentinas', icon: breadEmoji },
  { value: 'Tea Connection', label: 'Tea Connection', icon: teaEmoji },
  { value: 'other', label: 'Otra Marca Gastronómica...', icon: plusIcon },
];

const categories = [
  ['panaderia', 'Panadería / Pastelería'], ['cafeteria', 'Cafetería & Brunch'], ['rotiseria', 'Rotisería / Viandas'], ['pizzeria', 'Pizzería & Empanadas'], ['supermercado', 'Market / Almacén'],
];

export default function PartnerRegistrationForm() {
  const countryCode = useCountry();
  const copy = partnerRegistrationCopy[countryCode];
  const [businessModel, setBusinessModel] = useState('direct_store');
  const [fields, setFields] = useState({ brandName: '', legalName: '', taxId: '', category: 'panaderia', city: '', address: '', location: null, crossStreets: '', postalCode: '', phone: '', email: '', contactName: '', parentBrand: '', customParentBrand: '', holdingName: '', holdingBrands: '' });
  const [directBranches, setDirectBranches] = useState([]);
  const [franchiseLocations, setFranchiseLocations] = useState([{ id: 'franchise-1', name: 'Sucursal 1', address: '', location: null }]);
  const [pilotLocations, setPilotLocations] = useState([{ id: 'pilot-1', name: 'Local propio 1', address: '', location: null }]);
  const [hasOwnPilotStore, setHasOwnPilotStore] = useState(true);
  const [notice, setNotice] = useState('');
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(null);
  const branchSequence = useRef(2);
  const update = (name, value) => setFields((previous) => ({ ...previous, [name]: value }));

  const field = (name, label, { required = false, hint, type = 'text', autoComplete } = {}) => (
    <label className="partner-form__field" htmlFor={`partner-register-${name}`}><span>{label.replace(/\s*\*$/, '')}{required && <RequiredMark />}</span><input id={`partner-register-${name}`} name={name} type={type} value={fields[name]} onChange={(event) => update(name, event.target.value)} required={required} aria-describedby={hint ? `partner-register-${name}-hint` : undefined} autoComplete={autoComplete} />{hint && <span id={`partner-register-${name}-hint`} className="partner-form__hint">{hint}</span>}</label>
  );

  const branches = (list, setList, title, prefix, minimum = 0) => (
    <section className={`partner-register__branches partner-register__branches--${prefix}`} aria-label={title}>
      <div className="partner-register__branch-heading"><strong><Icon icon={storeIcon} aria-hidden="true" />{title}{list.length > 0 ? ` (${list.length})` : minimum === 0 ? <span className="partner-register__optional">· {copy.optional}</span> : null}</strong><button type="button" onClick={() => {
        const sequence = branchSequence.current++;
        setList((previous) => [...previous, { id: `${prefix}-${sequence}`, name: prefix === 'pilot' ? `${copy.ownLocal} ${previous.length + 1}` : `${copy.branch} ${previous.length + (prefix === 'direct' ? 2 : 1)}`, address: '', location: null }]);
      }}><Icon icon={plusIcon} aria-hidden="true" /> {copy.addBranch}</button></div>
      {list.map((branch, index) => (
        <div className="partner-register__branch" key={branch.id}>
          <div className="partner-register__branch-heading"><strong>{prefix === 'pilot' ? copy.ownLocal : copy.branch} #{index + (prefix === 'direct' ? 2 : 1)}{prefix === 'pilot' && index === 0 && <small>{copy.mainBranch}</small>}</strong>{list.length > minimum && <button type="button" aria-label={`${copy.removeBranch} ${index + (prefix === 'direct' ? 2 : 1)}`} onClick={() => setList((previous) => previous.filter((entry) => entry.id !== branch.id))}><Icon icon={trashIcon} aria-hidden="true" /></button>}</div>
          <label className="partner-form__field" htmlFor={`${branch.id}-name`}>{copy.branchName}<input id={`${branch.id}-name`} name={`${branch.id}-name`} aria-describedby={prefix === 'franchise' ? `${branch.id}-name-hint` : undefined} value={branch.name} onChange={(event) => setList((previous) => previous.map((entry) => entry.id === branch.id ? { ...entry, name: event.target.value } : entry))} />{prefix === 'franchise' && <span id={`${branch.id}-name-hint`} className="partner-form__hint">{copy.branchNameHint}</span>}</label>
          <PartnerAddress id={`${branch.id}-address`} label={copy.branchAddress} value={branch.address} location={branch.location} onConfirm={(location) => setList((previous) => previous.map((entry) => entry.id === branch.id ? { ...entry, location, address: location.formattedAddress } : entry))} onChange={(value) => setList((previous) => previous.map((entry) => entry.id === branch.id ? { ...entry, address: value } : entry))} />
        </div>
      ))}
    </section>
  );

  if (success) return <RegistrationSuccess email={fields.email} business verificationRequired={success.verificationRequired} />;

  return (
    <form className="partner-form partner-register" aria-label={copy.formLabel} onSubmit={async (event) => {
      event.preventDefault();
      if (pending) return;
      const form = new FormData(event.currentTarget);
      const password = String(form.get('password') || '');
      if (password !== form.get('passwordConfirmation')) { setNotice(copy.mismatch); return; }
      if (new TextEncoder().encode(password).length > 72) { setNotice(copy.tooLong); return; }
      const locationEntries = businessModel === 'direct_store' ? [{ name: fields.brandName, location: fields.location }, ...directBranches] : businessModel === 'franchisee' ? franchiseLocations : businessModel === 'franchisor' && hasOwnPilotStore ? pilotLocations : [];
      if (locationEntries.some((entry) => !entry.location)) { setNotice(copy.missingLocation); return; }
      const brand = fields.parentBrand === 'other' ? fields.customParentBrand : fields.parentBrand;
      const businessName = businessModel === 'holding' ? fields.holdingName : businessModel === 'franchisee' ? brand : fields.brandName;
      setPending(true); setNotice('');
      try {
        const result = await registerBusiness({ name: fields.contactName, email: fields.email, phone: fields.phone, password, acceptedTerms: form.get('acceptedTerms') === 'on', countryCode,
          businessType: { direct_store: 'INDEPENDENT', franchisee: 'FRANCHISEE', franchisor: 'BRAND_OWNER', holding: 'GROUP' }[businessModel],
          businessName, legalName: businessModel === 'holding' ? fields.holdingName : fields.legalName, taxId: fields.taxId,
          locations: locationEntries.map(({ name, location }) => ({ ...location, name })),
          details: { category: fields.category, brand: businessModel === 'franchisee' ? brand : '', groupBrands: businessModel === 'holding' ? fields.holdingBrands.split(',').map((value) => value.trim()).filter(Boolean) : [] },
        });
        setSuccess(result);
      } catch (error) { setNotice(authError(error)); }
      finally { setPending(false); }
    }}>
      <fieldset className="partner-register__models"><legend>{copy.chooseModel}<RequiredMark /></legend><div>{businessModels.map(({ value, icon }) => <button key={value} type="button" data-model={value} aria-pressed={businessModel === value} onClick={() => { setBusinessModel(value); setNotice(''); }}><strong><Icon icon={icon} aria-hidden="true" />{copy.models[value][0]}</strong><span>{copy.models[value][1]}</span></button>)}</div></fieldset>
      <details className="partner-register__info" open><summary><Icon icon={infoIcon} aria-hidden="true" />{copy.infoTitle}<Icon className="partner-register__info-chevron" icon={chevronDownIcon} aria-hidden="true" /></summary><div>
        {[shieldIcon, clockIcon, storeIcon, checkIcon].map((icon, index) => <p key={copy.info[index][0]}><Icon icon={icon} aria-hidden="true" /><span><strong>{copy.info[index][0]}</strong> {copy.info[index][1]}</span></p>)}
      </div></details>

      {businessModel === 'direct_store' && <div className="partner-register__fields"><h2 className="partner-register__section-title">{copy.businessTitle}</h2>
        {field('brandName', copy.businessName, { required: true })}
        <div className="partner-form__row">{field('legalName', copy.operatorName, { required: true, hint: copy.legalNameHint })}{field('taxId', `${copy.taxName} *`, { required: true, hint: copy.taxExample })}</div>
        <div className="partner-form__row"><label className="partner-form__field" htmlFor="partner-register-category">{copy.businessType}<select id="partner-register-category" name="category" value={fields.category} onChange={(event) => update('category', event.target.value)}>{categories.map(([value]) => <option key={value} value={value}>{copy.categories[value]}</option>)}</select></label></div>
        <h2 className="partner-register__section-title">{copy.locationTitle}</h2>
        <PartnerAddress id="partner-register-address" label={copy.localAddress} value={fields.address} location={fields.location} onChange={(value) => update('address', value)} onConfirm={(location) => setFields((previous) => ({ ...previous, location, address: location.formattedAddress, city: location.city, postalCode: location.postalCode, crossStreets: location.reference }))} />
        {branches(directBranches, setDirectBranches, copy.additionalBranches, 'direct')}
      </div>}

      {businessModel === 'franchisee' && <div className="partner-register__fields"><h2 className="partner-register__section-title">{copy.businessTitle}</h2>
        <div className="partner-register__brand-box partner-register__brand-box--green"><div className="partner-register__branch-heading"><label className="partner-form__field" htmlFor="partner-register-parentBrand"><Icon icon={branchIcon} aria-hidden="true" />{copy.franchiseBrand}<RequiredMark /></label></div>
          <div className="partner-register__brand-select"><Icon icon={franchiseBrands.find((brand) => brand.value === fields.parentBrand)?.icon || branchIcon} aria-hidden="true" /><select id="partner-register-parentBrand" name="parentBrand" required value={fields.parentBrand} onChange={(event) => update('parentBrand', event.target.value)}><option value="" disabled>{copy.chooseBrand}</option>{franchiseBrands.map(({ value, label }) => <option key={value} value={value}>{value === 'other' ? copy.otherBrand : label}</option>)}</select></div>
          {fields.parentBrand === 'other' && field('customParentBrand', copy.brandName, { required: true })}
          <p>{copy.franchiseHint}</p>
        </div>
        <div className="partner-form__row">{field('legalName', copy.operatorName, { required: true, hint: copy.legalNameHint })}{field('taxId', `${copy.taxName} *`, { required: true, hint: copy.taxExample })}</div>
        {branches(franchiseLocations, setFranchiseLocations, copy.yourBranches, 'franchise', 1)}
      </div>}

      {businessModel === 'franchisor' && <div className="partner-register__fields"><h2 className="partner-register__section-title">{copy.businessTitle}</h2>
        {field('brandName', copy.brandName, { required: true })}
        <div className="partner-form__row">{field('legalName', copy.operatorName, { required: true, hint: copy.legalNameHint })}{field('taxId', `${copy.taxName} *`, { required: true, hint: copy.taxExample })}</div>
        <fieldset className="partner-register__brand-box partner-register__brand-box--purple"><legend>{copy.ownLocalQuestion}</legend><p>{copy.ownLocalDefinition}</p><label><input type="radio" name="pilotStore" checked={hasOwnPilotStore} onChange={() => setHasOwnPilotStore(true)} /> {copy.ownLocalYes}</label><label><input type="radio" name="pilotStore" checked={!hasOwnPilotStore} onChange={() => setHasOwnPilotStore(false)} /> {copy.ownLocalNo}</label></fieldset>
        {hasOwnPilotStore ? branches(pilotLocations, setPilotLocations, copy.ownBranches, 'pilot', 1) : <p className="partner-register__brand-box partner-register__brand-box--purple">{copy.ownLocalHint}</p>}
      </div>}

      {businessModel === 'holding' && <div className="partner-register__fields"><h2 className="partner-register__section-title">{copy.businessTitle}</h2>
        {field('holdingName', copy.groupLegalName, { required: true })}
        {field('taxId', copy.taxName, { required: true, hint: copy.taxExample })}
        <div className="partner-register__brand-box partner-register__brand-box--blue">{field('holdingBrands', copy.groupBrands, { required: true, hint: copy.brandsHint })}<p>{copy.groupHint}</p></div>
      </div>}

      <section className="partner-register__contact" aria-label={copy.contactTitle}><h2 className="partner-register__section-title">{copy.contactTitle}</h2>
        <div className="partner-form__row">
          {field('contactName', copy.contactName, { required: true, autoComplete: 'name' })}
          <div className="partner-form__field"><label htmlFor="partner-register-phone">{copy.contactPhone}<RequiredMark /></label><PhoneField id="partner-register-phone" value={fields.phone} onChange={(phone) => update('phone', phone)} required /></div>
        </div>
        {field('email', copy.contactEmail, { required: true, type: 'email', autoComplete: 'email' })}
        <p className="partner-form__hint">{copy.credentialsHint}</p>
        <div className="partner-form__row">
          <label className="partner-form__field" htmlFor="partner-register-password"><span>{copy.password}<RequiredMark /></span><PasswordField id="partner-register-password" /><small className="partner-form__hint">{copy.passwordHint}</small></label>
          <label className="partner-form__field" htmlFor="partner-register-confirmation"><span>{copy.confirmation}<RequiredMark /></span><PasswordField id="partner-register-confirmation" name="passwordConfirmation" confirmation /></label>
        </div>
      </section>
      <label className="partner-register__terms"><input type="checkbox" name="acceptedTerms" required /><span>{copy.acceptTerms} <Link href="/terminos" target="_blank" rel="noopener noreferrer">{copy.terms}</Link> {copy.termsJoin} <Link href="/privacidad" target="_blank" rel="noopener noreferrer">{copy.privacy}</Link>.<RequiredMark /></span></label>
      <FormNotice>{notice}</FormNotice>
      <button type="submit" className="partner-form__submit" disabled={pending}><Icon icon={sparklesIcon} aria-hidden="true" /> {pending ? copy.pending : copy.submit}</button>
    </form>
  );
}
