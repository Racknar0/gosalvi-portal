'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react/offline';
import closeIcon from '@iconify-icons/lucide/x';
import searchIcon from '@iconify-icons/lucide/search';
import pinIcon from '@iconify-icons/lucide/map-pin';
import navigationIcon from '@iconify-icons/lucide/navigation';
import RequiredMark from '@/components/RequiredMark/RequiredMark';
import {
  locateCoordinates,
  searchLocations,
  selectLocation,
} from '@/services/LocationService';
import { loadLocationCatalog } from '@/app/(public)/locationActions';
import {
  DEFAULT_LOCATION,
  SUPPORTED_COUNTRIES,
} from '@/helpers/locationDefaults';
import { setCountry, useCountry } from '@/helpers/countryPreference';
import PartnerLocationMap from '../PartnerLocationMap/PartnerLocationMap';
import './PartnerLocationPicker.scss';

const catalogRequests = new Map();
function loadCatalog(countryCode) {
  if (!catalogRequests.has(countryCode))
    catalogRequests.set(
      countryCode,
      loadLocationCatalog(countryCode).catch((error) => {
        catalogRequests.delete(countryCode);
        throw error;
      }),
    );
  return catalogRequests.get(countryCode);
}

export default function PartnerLocationPicker({
  id,
  value,
  location,
  onClose,
  onConfirm,
}) {
  const activeCountry = useCountry();
  const dialog = useRef(null);
  const searchSequence = useRef(0);
  const locationSequence = useRef(0);
  const [draft, setDraft] = useState(() =>
    location
      ? { ...location }
      : {
          ...DEFAULT_LOCATION,
          countryCode: activeCountry,
          country:
            SUPPORTED_COUNTRIES.find(({ code }) => code === activeCountry)
              ?.name || DEFAULT_LOCATION.country,
          street: value || '',
          number: '',
          postalCode: '',
          reference: '',
          coordinates: null,
          placeId: null,
          formattedAddress: value || '',
        },
  );
  const [manual, setManual] = useState(
    location?.verificationStatus === 'manual',
  );
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [searching, setSearching] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [mapError, setMapError] = useState('');
  const [edited, setEdited] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [catalog, setCatalog] = useState(null);
  const [catalogError, setCatalogError] = useState('');
  const [catalogRetry, setCatalogRetry] = useState(0);

  useEffect(() => {
    let active = true;
    loadCatalog(draft.countryCode)
      .then((items) => {
        if (active) {
          setCatalog(items);
          setCatalogError('');
        }
      })
      .catch(() => {
        if (active) setCatalogError('No pudimos cargar las ciudades.');
      });
    return () => {
      active = false;
    };
  }, [catalogRetry, draft.countryCode]);

  useEffect(() => {
    const element = dialog.current;
    locationSequence.current = 0;
    const previous = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      locationSequence.current = Number.MAX_SAFE_INTEGER;
      element.close();
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    const sequence = ++searchSequence.current;
    let active = true;
    if (!focused || manual || mapError || query.trim().length < 3) return;
    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const results = await searchLocations(query.trim(), draft.countryCode);
        if (!active || sequence !== searchSequence.current) return;
        setSuggestions(results);
        setActiveIndex(-1);
        setError(
          results.length
            ? ''
            : 'No encontramos resultados. Probá con calle, altura y ciudad.',
        );
      } catch {
        if (active && sequence === searchSequence.current)
          setError(
            'No pudimos buscar esa dirección. Podés ingresarla manualmente.',
          );
      } finally {
        if (active && sequence === searchSequence.current) setSearching(false);
      }
    }, 600);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [query, focused, manual, mapError, draft.countryCode]);

  async function chooseSuggestion(suggestion) {
    const sequence = ++locationSequence.current;
    searchSequence.current++;
    setFocused(false);
    setSuggestions([]);
    setSearching(false);
    setBusy(true);
    setError('');
    try {
      const result = await selectLocation(suggestion);
      if (sequence !== locationSequence.current) return;
      setDraft((previous) => ({ ...result, reference: previous.reference }));
      setEdited(false);
    } catch (reason) {
      if (sequence === locationSequence.current)
        setError(
          reason.message ||
            'No pudimos ubicar esta dirección. Probá otra búsqueda.',
        );
    } finally {
      if (sequence === locationSequence.current) setBusy(false);
    }
  }

  async function movePin(coordinates) {
    const sequence = ++locationSequence.current;
    setBusy(true);
    setError('');
    setDraft((previous) => ({
      ...previous,
      coordinates,
      street: '',
      number: '',
      city: '',
      cityId: '',
      province: '',
      provinceId: '',
      territoryWarning: '',
      postalCode: '',
      placeId: null,
      formattedAddress: '',
    }));
    try {
      const result = await locateCoordinates(coordinates);
      if (sequence !== locationSequence.current) return;
      setDraft((previous) => ({ ...result, reference: previous.reference }));
      setEdited(false);
    } catch (reason) {
      if (sequence === locationSequence.current) {
        setError(
          reason.message ||
            'No pudimos leer la dirección. Completala debajo del mapa.',
        );
        if (reason.code === 'UNSUPPORTED_COUNTRY')
          setDraft((previous) => ({ ...previous, coordinates: null }));
      }
    } finally {
      if (sequence === locationSequence.current) setBusy(false);
    }
  }

  function useGps() {
    if (!navigator.geolocation) {
      setError(
        'Tu navegador no permite obtener la ubicación. Buscá la dirección del local.',
      );
      return;
    }
    const sequence = ++locationSequence.current;
    setBusy(true);
    setError('');
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        if (sequence === locationSequence.current && dialog.current?.open)
          movePin({ lat: coords.latitude, lng: coords.longitude });
      },
      () => {
        if (sequence !== locationSequence.current || !dialog.current?.open)
          return;
        setBusy(false);
        setError(
          'No pudimos acceder a tu ubicación. Buscá la dirección del local.',
        );
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );
  }

  function setField(name, fieldValue) {
    setDraft((previous) => ({ ...previous, [name]: fieldValue }));
    if (name !== 'reference') setEdited(true);
  }

  function changeCountry(countryCode) {
    setCountry(countryCode);
    locationSequence.current++;
    searchSequence.current++;
    setDraft((previous) => ({
      ...previous,
      countryCode,
      country:
        SUPPORTED_COUNTRIES.find(({ code }) => code === countryCode)?.name ||
        '',
      city: '',
      cityId: '',
      province: '',
      provinceId: '',
      street: '',
      number: '',
      postalCode: '',
      reference: '',
      placeId: null,
      coordinates: null,
      formattedAddress: '',
      territoryWarning: '',
    }));
    setQuery('');
    setSuggestions([]);
    setFocused(false);
    setSearching(false);
    setBusy(false);
    setError('');
    setCatalogError('');
    setAttempted(false);
    setEdited(true);
  }

  function confirm() {
    setAttempted(true);
    const missing =
      !draft.street.trim() ||
      !draft.number.trim() ||
      !draft.cityId ||
      !draft.provinceId ||
      !SUPPORTED_COUNTRIES.some(({ code }) => code === draft.countryCode);
    if (missing || busy || (!manual && (!draft.coordinates || mapError)))
      return;
    const formattedAddress = [
      ...new Set([
        `${draft.street.trim()} ${draft.number.trim()}`,
        draft.city.trim(),
        draft.province.trim(),
      ]),
    ].join(', ');
    onConfirm({
      ...draft,
      street: draft.street.trim(),
      number: draft.number.trim(),
      city: draft.city.trim(),
      province: draft.province.trim(),
      formattedAddress,
      reference: draft.reference.trim(),
      postalCode: draft.postalCode.trim(),
      countryCode: draft.countryCode,
      provider: manual ? 'manual' : 'photon',
      coordinates: manual ? null : draft.coordinates,
      verificationStatus: manual ? 'manual' : 'map_confirmed',
      addressEdited: edited,
    });
  }

  function addressField(name, text, required = false) {
    const invalid = attempted && required && !draft[name].trim();
    return (
      <label
        className="partner-location-picker__field"
        htmlFor={`${id}-${name}`}
      >
        <span>
          {text}
          {required && <RequiredMark />}
        </span>
        <input
          id={`${id}-${name}`}
          value={draft[name]}
          onChange={(event) => setField(name, event.target.value)}
          autoComplete="off"
          aria-required={required}
          aria-invalid={invalid || undefined}
          disabled={busy}
        />
        {invalid && (
          <small className="partner-location-picker__error">
            Completá este campo.
          </small>
        )}
      </label>
    );
  }

  return (
    <dialog
      ref={dialog}
      className="partner-location-picker"
      aria-labelledby={`${id}-picker-title`}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={(event) => {
        if (
          event.key === 'Enter' &&
          event.target.tagName === 'INPUT' &&
          event.target.getAttribute('role') !== 'combobox'
        ) {
          event.preventDefault();
          confirm();
        }
      }}
    >
      <header className="partner-location-picker__header">
        <div>
          <h2 id={`${id}-picker-title`}>Ubicación del local</h2>
          <p>
            {manual
              ? 'Ingresá la dirección. El punto del mapa quedará pendiente.'
              : 'Buscá tu local y ajustá el pin en la entrada.'}
          </p>
        </div>
        <button type="button" onClick={onClose} aria-label="Cerrar ubicación">
          <Icon icon={closeIcon} aria-hidden="true" />
        </button>
      </header>
      <div className="partner-location-picker__body">
        {!manual && (
          <>
            <div className="partner-location-picker__search">
              <label htmlFor={`${id}-search`}>Buscá tu local o dirección</label>
              <div className="partner-location-picker__search-input">
                <Icon icon={searchIcon} aria-hidden="true" />
                <input
                  id={`${id}-search`}
                  role="combobox"
                  aria-autocomplete="list"
                  aria-expanded={focused && suggestions.length > 0}
                  aria-controls={`${id}-suggestions`}
                  aria-activedescendant={
                    activeIndex >= 0 && suggestions[activeIndex]
                      ? `${id}-suggestion-${activeIndex}`
                      : undefined
                  }
                  value={query}
                  autoComplete="off"
                  disabled={!!mapError}
                  onFocus={() => setFocused(true)}
                  onChange={(event) => {
                    searchSequence.current++;
                    setQuery(event.target.value);
                    setSuggestions([]);
                    setSearching(false);
                    setActiveIndex(-1);
                    setError('');
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      if (suggestions[activeIndex >= 0 ? activeIndex : 0])
                        chooseSuggestion(
                          suggestions[activeIndex >= 0 ? activeIndex : 0],
                        );
                    }
                    if (event.key === 'ArrowDown') {
                      event.preventDefault();
                      setActiveIndex((index) =>
                        Math.min(index + 1, suggestions.length - 1),
                      );
                    }
                    if (event.key === 'ArrowUp') {
                      event.preventDefault();
                      setActiveIndex((index) => Math.max(index - 1, 0));
                    }
                    if (event.key === 'Escape' && suggestions.length) {
                      event.preventDefault();
                      event.stopPropagation();
                      setFocused(false);
                      setSuggestions([]);
                    }
                  }}
                />
              </div>
              <ul
                id={`${id}-suggestions`}
                role="listbox"
                aria-label="Direcciones sugeridas"
                className="partner-location-picker__suggestions"
                hidden={!focused || !suggestions.length}
              >
                {suggestions.map((suggestion, index) => (
                  <li
                    key={suggestion.id}
                    id={`${id}-suggestion-${index}`}
                    role="option"
                    aria-selected={index === activeIndex}
                  >
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => chooseSuggestion(suggestion)}
                    >
                      <Icon icon={pinIcon} aria-hidden="true" />
                      <span>
                        <strong>{suggestion.title}</strong>
                        <small>{suggestion.description}</small>
                      </span>
                    </button>
                  </li>
                ))}
                {suggestions.length > 0 && (
                  <li
                    role="presentation"
                    className="partner-location-picker__attribution"
                  >
                    <a
                      href="https://www.openstreetmap.org/copyright"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Datos de OpenStreetMap · búsqueda Photon
                    </a>
                  </li>
                )}
              </ul>
            </div>
            <div className="partner-location-picker__map-heading">
              <span>
                {busy
                  ? 'Buscando la dirección del punto…'
                  : searching
                    ? 'Buscando direcciones…'
                    : 'Tocá el mapa o mové el pin.'}
              </span>
              <button
                type="button"
                onClick={useGps}
                disabled={busy || !!mapError}
              >
                <Icon icon={navigationIcon} aria-hidden="true" />
                Usar mi ubicación
              </button>
            </div>
            <PartnerLocationMap
              coordinates={draft.coordinates}
              countryCode={draft.countryCode}
              onMove={movePin}
              onFailure={setMapError}
            />
          </>
        )}
        <button
          className="partner-location-picker__manual"
          type="button"
          onClick={() => {
            locationSequence.current++;
            searchSequence.current++;
            setManual((previous) => !previous);
            setBusy(false);
            setSearching(false);
            setSuggestions([]);
            setError('');
            setMapError('');
            setDraft((previous) => ({
              ...previous,
              coordinates: null,
              placeId: null,
            }));
          }}
        >
          {manual
            ? 'Elegir ubicación en el mapa'
            : 'Ingresar dirección manualmente'}
        </button>
        {error && (
          <p className="partner-location-picker__error" role="alert">
            {error}
          </p>
        )}
        <div className="partner-location-picker__address-heading">
          <h3>{manual ? 'Dirección del local' : 'Revisá la dirección'}</h3>
          <p>
            {manual
              ? 'Podés confirmar la dirección y ubicarla en el mapa más adelante.'
              : 'Podés corregir estos datos sin mover el pin.'}
          </p>
        </div>
        <div className="partner-location-picker__row partner-location-picker__row--street">
          {addressField('street', 'Calle', true)}
          {addressField('number', 'Altura', true)}
        </div>
        {draft.territoryWarning && (
          <p className="partner-location-picker__territory-note" role="status">
            {draft.territoryWarning}
          </p>
        )}
        <div className="partner-location-picker__row">
          <label
            className="partner-location-picker__field"
            htmlFor={`${id}-country`}
          >
            <span>
              País
              <RequiredMark />
            </span>
            <select
              id={`${id}-country`}
              value={draft.countryCode}
              onChange={(event) => changeCountry(event.target.value)}
            >
              {SUPPORTED_COUNTRIES.map(({ code, name }) => (
                <option value={code} key={code}>
                  {name}
                </option>
              ))}
            </select>
          </label>
          <label
            className="partner-location-picker__field"
            htmlFor={`${id}-city`}
          >
            <span>
              Ciudad
              <RequiredMark />
            </span>
            <select
              id={`${id}-city`}
              value={draft.cityId || ''}
              disabled={busy || catalog?.countryCode !== draft.countryCode}
              aria-required="true"
              aria-invalid={(attempted && !draft.cityId) || undefined}
              onChange={(event) => {
                const city = catalog.cities.find(
                  (option) => option.value === event.target.value,
                );
                setDraft((previous) => ({
                  ...previous,
                  cityId: city?.value || '',
                  city: city?.name || '',
                  provinceId: city?.stateCode || '',
                  province: city?.stateName || '',
                  territoryWarning: '',
                }));
                setEdited(true);
              }}
            >
              <option value="">
                {catalog?.countryCode !== draft.countryCode
                  ? 'Cargando ciudades…'
                  : 'Elegí una ciudad'}
              </option>
              {catalog?.countryCode !== draft.countryCode && draft.cityId && (
                <option value={draft.cityId}>{draft.city}</option>
              )}
              {catalog?.countryCode === draft.countryCode &&
                catalog.cities.map((city) => (
                  <option value={city.value} key={city.value}>
                    {city.label}
                  </option>
                ))}
            </select>
            {attempted && !draft.cityId && (
              <small className="partner-location-picker__error">
                Seleccioná una ciudad.
              </small>
            )}
          </label>
        </div>
        {catalogError && (
          <p className="partner-location-picker__error" role="alert">
            {catalogError}{' '}
            <button
              type="button"
              className="partner-location-picker__manual"
              onClick={() => setCatalogRetry((previous) => previous + 1)}
            >
              Reintentar
            </button>
          </p>
        )}
        <div className="partner-location-picker__row partner-location-picker__row--reference">
          {addressField('reference', 'Referencia (opcional)')}
          {addressField('postalCode', 'Código postal (opcional)')}
        </div>
        {attempted && !manual && !draft.coordinates && (
          <p className="partner-location-picker__error" role="alert">
            Elegí un punto en el mapa o ingresá la dirección manualmente.
          </p>
        )}
      </div>
      <footer className="partner-location-picker__footer">
        <button type="button" onClick={onClose}>
          Cancelar
        </button>
        <button
          type="button"
          className="partner-location-picker__confirm"
          onClick={confirm}
          disabled={busy || (!manual && !!mapError)}
        >
          {busy ? 'Ubicando…' : 'Confirmar ubicación'}
          <Icon icon={pinIcon} aria-hidden="true" />
        </button>
      </footer>
    </dialog>
  );
}
