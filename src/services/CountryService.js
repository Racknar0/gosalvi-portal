'use client';

import HttpService from './HttpService';

const service = new HttpService();

export async function detectVisitorCountry() {
  const response = await service.getData('/api/country');
  return response.data.countryCode === 'CO' ? 'CO' : 'AR';
}
