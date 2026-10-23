'use client';
import HttpService from './HttpService';
const service = new HttpService();
export const listUsers = async (search = '', page = 1) =>
  (
    await service.getData(
      `/api/users?${new URLSearchParams({ search, page: String(page) })}`,
    )
  ).data;
export const createUser = async (data) =>
  (await service.postData('/api/users', data)).data;
export const updateUser = async (id, data) =>
  (await service.putData('/api/users', id, data)).data;
export const deleteUser = async (id, emailConfirmation) =>
  (await service.deleteDataWithBody(`/api/users/${id}`, { emailConfirmation }))
    .data;
