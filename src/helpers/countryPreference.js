'use client';

import { useSyncExternalStore } from 'react';
import { SUPPORTED_COUNTRIES } from './locationDefaults';

const STORAGE_KEY = 'salvi-country';
const COUNTRY_EVENT = 'salvi-country-change';

function isSupported(code) {
  return SUPPORTED_COUNTRIES.some((country) => country.code === code);
}

function getCountry() {
  if (typeof window === 'undefined') return 'AR';
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return isSupported(saved) ? saved : 'AR';
}

function subscribe(onChange) {
  window.addEventListener(COUNTRY_EVENT, onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(COUNTRY_EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
}

export function useCountry() {
  return useSyncExternalStore(subscribe, getCountry, () => 'AR');
}

export function setCountry(code) {
  if (typeof window === 'undefined' || !isSupported(code)) return;
  window.localStorage.setItem(STORAGE_KEY, code);
  window.dispatchEvent(new Event(COUNTRY_EVENT));
}

export function countryName(code) {
  return (
    SUPPORTED_COUNTRIES.find((country) => country.code === code)?.name ||
    'Argentina'
  );
}

export function countryText(code, argentina, colombia) {
  return code === 'CO' ? colombia : argentina;
}
