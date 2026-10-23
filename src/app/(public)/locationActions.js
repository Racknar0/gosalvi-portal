'use server';

import { getLocationCatalog, getCountryCities, normalizeMapTerritory } from '@/services/LocationCatalogService';

export async function loadCountryCities(countryCode) {
  return getCountryCities(countryCode);
}

export async function loadLocationCatalog(countryCode) {
  return getLocationCatalog(countryCode);
}

export async function normalizeLocationTerritory(input) {
  return normalizeMapTerritory({ countryCode: input?.countryCode, city: typeof input?.city === 'string' ? input.city.slice(0, 200) : '', province: typeof input?.province === 'string' ? input.province.slice(0, 200) : '' });
}
