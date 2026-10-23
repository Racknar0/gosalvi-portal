'use client';

import axios from 'axios';
import pinIcon from '@iconify-icons/lucide/map-pin';
import { normalizeLocationTerritory } from '@/app/(public)/locationActions';
import {
  DEFAULT_LOCATION,
  SUPPORTED_COUNTRIES,
} from '@/helpers/locationDefaults';

const cache = new Map();
let gate = Promise.resolve();
let lastRequestAt = 0;
let searchController;
let reverseController;

async function request(path, params, signal) {
  const baseURL = process.env.NEXT_PUBLIC_GEOCODING_URL?.trim();
  if (!baseURL)
    throw new Error(
      'La búsqueda de direcciones no está configurada. Podés ingresarla manualmente.',
    );
  const key = `${baseURL}${path}?${new URLSearchParams(params)}`;
  const saved = cache.get(key);
  if (saved && Date.now() - saved.time < 300000) return saved.data;
  gate = gate
    .catch(() => {})
    .then(async () => {
      if (signal.aborted) throw new axios.CanceledError();
      const delay = Math.max(0, 750 - (Date.now() - lastRequestAt));
      if (delay) await new Promise((resolve) => setTimeout(resolve, delay));
      if (signal.aborted) throw new axios.CanceledError();
      lastRequestAt = Date.now();
    });
  await gate;
  const { data } = await axios.get(path, {
    baseURL,
    params,
    signal,
    timeout: 8000,
    headers: { 'Accept-Language': 'es' },
  });
  if (!Array.isArray(data?.features))
    throw new Error(
      'La búsqueda devolvió una respuesta inesperada. Probá de nuevo.',
    );
  if (cache.size >= 100) cache.delete(cache.keys().next().value);
  cache.set(key, { time: Date.now(), data });
  return data;
}

function normalizeLocation(feature, pinCoordinates) {
  const properties = feature.properties || {};
  const countryCode = String(properties.countrycode || '').toUpperCase();
  if (!SUPPORTED_COUNTRIES.some(({ code }) => code === countryCode)) {
    const error = new Error('Elegí una ubicación en Argentina o Colombia.');
    error.code = 'UNSUPPORTED_COUNTRY';
    throw error;
  }
  const [lng, lat] = feature.geometry?.coordinates || [];
  if (!Number.isFinite(lat) || !Number.isFinite(lng))
    throw new Error('No encontramos las coordenadas de esta dirección.');
  const street =
    properties.street ||
    (properties.type === 'street' || properties.osm_value === 'residential'
      ? properties.name
      : '') ||
    '';
  const number = String(properties.housenumber || '');
  const city =
    properties.city ||
    properties.town ||
    properties.village ||
    properties.locality ||
    '';
  const province = properties.state || '';
  return {
    provider: 'photon',
    placeId: properties.osm_id
      ? `osm-${properties.osm_type || ''}-${properties.osm_id}`
      : null,
    placeName: properties.name || '',
    formattedAddress: [
      [street, number].filter(Boolean).join(' ') || properties.name,
      city,
      province,
    ]
      .filter(Boolean)
      .join(', '),
    street,
    number,
    city,
    province,
    postalCode: String(properties.postcode || ''),
    countryCode,
    coordinates: pinCoordinates || { lat, lng },
    reference: '',
  };
}

export async function searchLocations(
  query,
  countryCode = DEFAULT_LOCATION.countryCode,
) {
  if (!SUPPORTED_COUNTRIES.some(({ code }) => code === countryCode)) return [];
  searchController?.abort();
  searchController = new AbortController();
  const { features } = await request(
    '/api/',
    { q: query, countrycode: countryCode, limit: 6 },
    searchController.signal,
  );
  return features
    .filter(
      (feature) =>
        String(feature.properties?.countrycode).toUpperCase() === countryCode,
    )
    .map((feature, index) => {
      const location = normalizeLocation(feature);
      const address = [location.street, location.number]
        .filter(Boolean)
        .join(' ');
      return {
        id: `${location.placeId || 'location'}-${index}`,
        title: location.placeName || address || location.formattedAddress,
        description: [
          location.placeName && location.placeName !== address ? address : '',
          location.city,
          location.province,
        ]
          .filter(Boolean)
          .join(', '),
        location,
      };
    });
}

export async function selectLocation(suggestion) {
  return normalizeTerritory(suggestion.location);
}

async function normalizeTerritory(location) {
  try {
    return {
      ...location,
      ...(await normalizeLocationTerritory({
        city: location.city,
        province: location.province,
        countryCode: location.countryCode,
      })),
    };
  } catch {
    return {
      ...location,
      city: '',
      cityId: '',
      province: '',
      provinceId: '',
      territoryWarning:
        'No pudimos cargar las localidades. Volvé a elegir el punto o ingresá la dirección manualmente.',
    };
  }
}

export async function locateCoordinates(coordinates) {
  reverseController?.abort();
  reverseController = new AbortController();
  const { features } = await request(
    '/reverse',
    { lat: coordinates.lat, lon: coordinates.lng, limit: 1, radius: 1 },
    reverseController.signal,
  );
  if (!features.length)
    throw new Error(
      'No encontramos la dirección de este punto. Completala debajo del mapa.',
    );
  return normalizeTerritory(normalizeLocation(features[0], coordinates));
}

export async function createLocationMap(
  element,
  onMove,
  { isActive, onTileStatus },
) {
  const leaflet = await import('leaflet');
  if (!isActive()) return null;
  const L = leaflet.default || leaflet;
  const tileUrl = process.env.NEXT_PUBLIC_MAP_TILE_URL?.trim();
  if (!tileUrl)
    throw new Error(
      'El mapa no está configurado. Podés ingresar la dirección manualmente.',
    );
  const map = L.map(element, {
    center: [-34.6037, -58.3816],
    zoom: 12,
    scrollWheelZoom: true,
    attributionControl: true,
  });
  const tiles = L.tileLayer(tileUrl, {
    maxZoom: 19,
    keepBuffer: 0,
    updateWhenIdle: true,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
  }).addTo(map);
  let tileFailures = 0;
  tiles.on('tileerror', () => {
    tileFailures++;
    if (tileFailures >= 4)
      onTileStatus(
        'No pudimos cargar el mapa. Probá más tarde o ingresá la dirección manualmente.',
      );
  });
  tiles.on('tileload', () => {
    if (tileFailures >= 4) onTileStatus('');
    tileFailures = 0;
  });
  const icon = L.divIcon({
    className: 'partner-location-map__marker',
    html: `<span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${pinIcon.width || 24} ${pinIcon.height || 24}" aria-hidden="true">${pinIcon.body}</svg></span>`,
    iconSize: [38, 42],
    iconAnchor: [19, 38],
  });
  const marker = L.marker([0, 0], {
    icon,
    draggable: true,
    autoPan: true,
    keyboard: true,
    title: 'Punto de retiro. Arrastrá el pin o usá las flechas del teclado.',
  });
  function move(latlng) {
    marker.setLatLng(latlng);
    if (!map.hasLayer(marker)) marker.addTo(map);
    onMove({ lat: latlng.lat, lng: latlng.lng });
  }
  const keyboardMove = (event) => {
    const offsets = {
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
    };
    if (!offsets[event.key]) return;
    event.preventDefault();
    event.stopPropagation();
    const step = event.shiftKey ? 40 : 10;
    const [x, y] = offsets[event.key];
    const point = map.latLngToContainerPoint(marker.getLatLng());
    move(map.containerPointToLatLng(point.add([x * step, y * step])));
  };
  marker.on('add', () => {
    marker.getElement()?.addEventListener('keydown', keyboardMove);
    marker
      .getElement()
      ?.setAttribute(
        'aria-label',
        'Punto de retiro. Usá las flechas para ajustar la ubicación.',
      );
  });
  map.on('click', ({ latlng }) => move(latlng));
  marker.on('dragend', () => move(marker.getLatLng()));
  map.whenReady(() => map.invalidateSize());
  return {
    setCountry(countryCode) {
      const country = SUPPORTED_COUNTRIES.find(
        ({ code }) => code === countryCode,
      );
      if (country) map.setView(country.mapCenter, 12, { animate: false });
    },
    setPosition(coordinates) {
      if (!coordinates) {
        if (map.hasLayer(marker)) marker.remove();
        return;
      }
      marker.setLatLng(coordinates);
      if (!map.hasLayer(marker)) marker.addTo(map);
      map.setView(coordinates, Math.max(map.getZoom(), 17), { animate: false });
    },
    destroy() {
      marker.getElement()?.removeEventListener('keydown', keyboardMove);
      marker.off();
      tiles.off();
      map.off();
      map.remove();
    },
  };
}
