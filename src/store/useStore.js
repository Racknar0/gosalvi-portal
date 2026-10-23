"use client";

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

// Acceso de Salvi en memoria; el token se conserva por pestaña en sessionStorage.
const useStore = create(
  subscribeWithSelector((set) => ({
    loading: false,
    token: null,
    user: null,

    setLoading: (loading) => set({ loading }),
    login: (token, user = null) => set({ token, user }),
    logout: () => set({ token: null, user: null, loading: false }),
  })),
);

export const getState = useStore.getState;
export default useStore;
