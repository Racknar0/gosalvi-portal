import 'server-only';
import { City, Country, State } from 'country-state-city';
import {
  BUENOS_AIRES_CITY,
  SUPPORTED_COUNTRIES,
} from '@/helpers/locationDefaults';

const normalize = (value = '') =>
  String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLocaleLowerCase('es');

export function getCountries() {
  return SUPPORTED_COUNTRIES.map(({ code, name }) => ({ code, name }));
}

export function getCountryCities(countryCode) {
  if (
    !SUPPORTED_COUNTRIES.some(({ code }) => code === countryCode) ||
    !Country.getCountryByCode(countryCode)
  )
    return [];
  const states = new Map(
    State.getStatesOfCountry(countryCode).map(({ isoCode, name }) => [
      isoCode,
      name,
    ]),
  );
  const cities = new Map();
  for (const { name, stateCode: originalState } of City.getCitiesOfCountry(
    countryCode,
  ) || []) {
    // La librería ubica Buenos Aires ciudad bajo la provincia B: unificamos su jurisdicción como CABA.
    const stateCode =
      countryCode === 'AR' && name === BUENOS_AIRES_CITY.city
        ? BUENOS_AIRES_CITY.provinceId
        : originalState;
    const stateName = states.get(stateCode) || '';
    const value = `${stateCode}::${name}`;
    cities.set(value, {
      value,
      name,
      stateCode,
      stateName,
      label:
        (countryCode === 'AR' && stateCode === 'C') ||
        normalize(name) === normalize(stateName)
          ? name
          : stateName
            ? `${name}, ${stateName}`
            : name,
    });
  }
  return [...cities.values()].sort((a, b) =>
    a.label.localeCompare(b.label, 'es'),
  );
}

export function getLocationCatalog(countryCode) {
  if (!SUPPORTED_COUNTRIES.some(({ code }) => code === countryCode))
    return { countryCode: '', provinces: [], cities: [] };
  return {
    countryCode,
    provinces: State.getStatesOfCountry(countryCode).map(
      ({ isoCode, name }) => ({ id: isoCode, name }),
    ),
    cities: getCountryCities(countryCode),
  };
}

export function normalizeMapTerritory({ city, province, countryCode }) {
  const catalog = getLocationCatalog(countryCode);
  const provinceName = normalize(province);
  const cabaAliases = [
    'ciudad autonoma de buenos aires',
    'autonomous city of buenos aires',
    'buenos aires f.d.',
    'caba',
    'capital federal',
  ];
  const bogotaAliases = [
    'bogota',
    'bogota d.c.',
    'bogota, distrito capital',
    'distrito capital de bogota',
    'bogota distrito capital',
  ];
  const state = catalog.provinces.find(
    (item) =>
      normalize(item.name) === provinceName ||
      (countryCode === 'AR' &&
        item.id === 'C' &&
        cabaAliases.includes(provinceName)) ||
      (countryCode === 'CO' &&
        item.id === 'DC' &&
        bogotaAliases.includes(provinceName)),
  );
  const matches = catalog.cities.filter(
    (item) =>
      item.stateCode === state?.id &&
      (normalize(item.name) === normalize(city) ||
        (countryCode === 'CO' &&
          state?.id === 'DC' &&
          bogotaAliases.includes(normalize(city)) &&
          normalize(item.name) === 'bogota d.c.')),
  );
  const selected =
    countryCode === 'AR' && state?.id === 'C'
      ? catalog.cities.find((item) => item.value === BUENOS_AIRES_CITY.cityId)
      : matches.length === 1
        ? matches[0]
        : null;
  return {
    countryCode: catalog.countryCode,
    provinceId: state?.id || '',
    province: state?.name || '',
    cityId: selected?.value || '',
    city: selected?.name || '',
    territoryWarning: selected
      ? ''
      : 'Elegí la provincia y la ciudad para completar la dirección.',
  };
}
