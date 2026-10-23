'use client';

import HttpService from './HttpService';
import { getState } from '@/store/useStore';

const service = new HttpService();
const storageKey = 'salvi_access_token';

export const authError = (error) => error.response?.data?.message || (error.code === 'API_NOT_CONFIGURED' ? 'El acceso todavía no está configurado. Intenta más tarde.' : 'No pudimos conectar con Salvi. Revisa tu conexión e intenta nuevamente.');

export function restoreAuth() {
  let token = null;
  try { token = window.sessionStorage.getItem(storageKey); } catch { /* El acceso continúa en memoria si el navegador bloquea el almacenamiento. */ }
  token = getState().token || token;
  if (token && token !== getState().token) getState().login(token);
  return token;
}

export function logout() {
  try { window.sessionStorage.removeItem(storageKey); } catch { /* Limpiar igualmente el estado en memoria. */ }
  getState().logout();
}

export async function login(data) {
  const response = await service.postData('/api/auth/login', data);
  try { window.sessionStorage.setItem(storageKey, response.data.token); } catch { /* Mantener el acceso en esta pestaña en memoria. */ }
  getState().login(response.data.token, response.data.user);
  return response.data;
}

export const currentUser = async () => (await service.getData('/api/auth/me')).data.user;
export const registerCustomer = async (data) => (await service.postData('/api/auth/register', data)).data;
export const registerBusiness = async (data) => (await service.postData('/api/auth/register-business', data)).data;
export const forgotPassword = async (data) => (await service.postData('/api/auth/forgot-password', data)).data;
export const resetPassword = async (data) => (await service.postData('/api/auth/reset-password', data)).data;
export const verifyEmail = async (data) => (await service.postData('/api/auth/verify-email', data)).data;
export const resendVerification = async (data) => (await service.postData('/api/auth/resend-verification', data)).data;
