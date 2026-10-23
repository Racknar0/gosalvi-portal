'use client';

import { useSyncExternalStore } from 'react';
import { SUPPORTED_COUNTRIES } from './locationDefaults';
import { detectVisitorCountry } from '@/services/CountryService';

const STORAGE_KEY = 'salvi-country';
const COUNTRY_EVENT = 'salvi-country-change';
let memoryCountry = 'AR';
let preferenceRevision = 0;
let detection;

function isSupported(code) {
  return SUPPORTED_COUNTRIES.some((country) => country.code === code);
}

function savedCountry() {
  if (typeof window === 'undefined') return null;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return isSupported(saved) ? saved : null;
  } catch {
    return null;
  }
}

function getCountry() {
  return savedCountry() || memoryCountry;
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
  memoryCountry = code;
  preferenceRevision += 1;
  try {
    window.localStorage.setItem(STORAGE_KEY, code);
  } catch {
    // Mantener la elección en memoria si el navegador bloquea el almacenamiento.
  }
  window.dispatchEvent(new Event(COUNTRY_EVENT));
}

export function initializeCountry() {
  if (typeof window === 'undefined' || savedCountry()) return;
  if (!detection) {
    const initialRevision = preferenceRevision;
    detection = detectVisitorCountry()
      .catch(() => 'AR')
      .then((code) => {
        // Una elección hecha mientras llega la respuesta siempre tiene prioridad.
        if (!savedCountry() && preferenceRevision === initialRevision) {
          setCountry(code);
        }
      });
  }
  return detection;
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
