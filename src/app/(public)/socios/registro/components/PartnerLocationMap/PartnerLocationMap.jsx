'use client';

import { useEffect, useRef, useState } from 'react';
import { createLocationMap } from '@/services/LocationService';
import 'leaflet/dist/leaflet.css';
import './PartnerLocationMap.scss';

export default function PartnerLocationMap({
  coordinates,
  countryCode,
  onMove,
  onFailure,
}) {
  const container = useRef(null);
  const controller = useRef(null);
  const callbacks = useRef({ onMove, onFailure });
  const position = useRef(coordinates);
  const country = useRef(countryCode);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    callbacks.current = { onMove, onFailure };
  }, [onMove, onFailure]);
  useEffect(() => {
    country.current = countryCode;
    controller.current?.setCountry(countryCode);
  }, [countryCode]);
  useEffect(() => {
    position.current = coordinates;
    controller.current?.setPosition(coordinates);
  }, [coordinates]);
  useEffect(() => {
    let active = true;
    let map;
    const fail = (reason) => {
      if (!active) return;
      setLoading(false);
      setError(reason.message);
      callbacks.current.onFailure(reason.message);
    };
    createLocationMap(
      container.current,
      (point) => callbacks.current.onMove(point),
      {
        isActive: () => active,
        onTileStatus: (message) => {
          if (active) {
            setError(message);
            callbacks.current.onFailure(message);
          }
        },
      },
    )
      .then((instance) => {
        if (!instance) return;
        map = instance;
        if (!active) {
          instance.destroy();
          return;
        }
        controller.current = instance;
        instance.setCountry(country.current);
        instance.setPosition(position.current);
        setLoading(false);
      })
      .catch(fail);
    return () => {
      active = false;
      map?.destroy();
      controller.current = null;
    };
  }, []);

  return (
    <div className="partner-location-map">
      <div
        ref={container}
        className="partner-location-map__canvas"
        aria-label="Mapa para elegir el punto de retiro"
      />
      {(loading || error) && (
        <div className="partner-location-map__status" role="status">
          {error || 'Cargando mapa…'}
        </div>
      )}
    </div>
  );
}
