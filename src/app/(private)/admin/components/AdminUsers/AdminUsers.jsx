'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react/offline';
import plusIcon from '@iconify-icons/lucide/plus';
import pencilIcon from '@iconify-icons/lucide/pencil';
import trashIcon from '@iconify-icons/lucide/trash-2';
import closeIcon from '@iconify-icons/lucide/x';
import FormNotice from '@/components/FormNotice/FormNotice';
import PasswordField from '@/components/PasswordField/PasswordField';
import {
  listUsers,
  createUser,
  updateUser,
  deleteUser,
} from '@/services/UsersService';
import { authError } from '@/services/AuthService';
import { useCountry } from '@/helpers/countryPreference';
import { adminUsersCopy } from './AdminUsers.copy';
import './AdminUsers.scss';

export default function AdminUsers() {
  const copy = adminUsersCopy[useCountry()];
  const router = useRouter();
  const dialog = useRef(null);
  const [result, setResult] = useState({ users: [], total: 0, pageSize: 20 });
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [selection, setSelection] = useState(null);
  const [saving, setSaving] = useState(false);
  const [dialogError, setDialogError] = useState('');
  useEffect(() => {
    let active = true;
    Promise.resolve().then(async () => {
      setLoading(true);
      setError('');
      try {
        const data = await listUsers(query, page);
        if (active) setResult(data);
      } catch (failure) {
        if (active) {
          setError(authError(failure));
          if (failure.response?.status === 401) router.replace('/admin/login');
        }
      } finally {
        if (active) setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [query, page, reload, router]);
  useEffect(() => {
    if (selection && !dialog.current?.open) dialog.current?.showModal();
  }, [selection]);
  function open(mode, user = {}) {
    setDialogError('');
    setSelection({ mode, user });
  }
  function close() {
    if (saving) return;
    dialog.current?.close();
    setSelection(null);
    setDialogError('');
  }
  async function submit(event) {
    event.preventDefault();
    if (saving || !selection) return;
    const data = new FormData(event.currentTarget);
    if (
      new TextEncoder().encode(String(data.get('password') || '')).length > 72
    ) {
      setDialogError(copy.tooLong);
      return;
    }
    setSaving(true);
    setDialogError('');
    try {
      const payload = {
        name: data.get('name'),
        email: data.get('email'),
        platformRole: data.get('platformRole'),
        emailVerified: data.get('emailVerified') === 'on',
      };
      const response =
        selection.mode === 'delete'
          ? await deleteUser(selection.user.id, data.get('emailConfirmation'))
          : selection.mode === 'create'
            ? await createUser({ ...payload, password: data.get('password') })
            : await updateUser(selection.user.id, {
                ...payload,
                status: data.get('status'),
              });
      setNotice(response.message);
      dialog.current?.close();
      setSelection(null);
      if (selection.mode === 'delete' && result.users.length === 1 && page > 1)
        setPage((value) => value - 1);
      else setReload((value) => value + 1);
    } catch (failure) {
      setDialogError(authError(failure));
    } finally {
      setSaving(false);
    }
  }
  return (
    <section className="admin-users">
      <header className="admin-users__heading">
        <div>
          <h1>{copy.title}</h1>
          <p>{copy.description}</p>
        </div>
        <button
          className="admin-users__primary"
          type="button"
          onClick={() => open('create')}
        >
          <Icon icon={plusIcon} aria-hidden="true" />
          {copy.create}
        </button>
      </header>
      <FormNotice>{error}</FormNotice>
      <FormNotice success>{notice}</FormNotice>
      <form
        className="admin-users__search"
        onSubmit={(event) => {
          event.preventDefault();
          setPage(1);
          setQuery(search.trim());
          setReload((value) => value + 1);
        }}
      >
        <label htmlFor="user-search">{copy.search}</label>
        <div>
          <input
            id="user-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            maxLength={100}
          />
          <button type="submit">{copy.searchButton}</button>
        </div>
      </form>
      <p className="admin-users__count">
        {result.total} {copy.count}
      </p>
      <div className="admin-users__table">
        <table>
          <thead>
            <tr>
              <th>{copy.name}</th>
              <th>{copy.email}</th>
              <th>{copy.role}</th>
              <th>{copy.status}</th>
              <th>{copy.actions}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} role="status">
                  {copy.loading}
                </td>
              </tr>
            ) : result.users.length === 0 ? (
              <tr>
                <td colSpan={5}>{copy.empty}</td>
              </tr>
            ) : (
              result.users.map((user) => (
                <tr key={user.id}>
                  <td data-label={copy.name}>
                    <strong>{user.name}</strong>
                    <small>
                      {user.businessCount} {copy.businesses}
                    </small>
                  </td>
                  <td data-label={copy.email}>
                    <span className="admin-users__email">{user.email}</span>
                    <small>
                      {user.emailVerifiedAt ? copy.verified : copy.unverified}
                    </small>
                  </td>
                  <td data-label={copy.role}>
                    <span
                      className={`admin-users__badge${user.platformRole === 'ADMIN' ? ' admin-users__badge--admin' : ''}`}
                    >
                      {user.platformRole === 'ADMIN'
                        ? copy.admin
                        : copy.customer}
                    </span>
                  </td>
                  <td data-label={copy.status}>
                    <span
                      className={`admin-users__badge${user.status === 'DISABLED' ? ' admin-users__badge--disabled' : ''}`}
                    >
                      {user.status === 'ACTIVE' ? copy.active : copy.disabled}
                    </span>
                  </td>
                  <td data-label={copy.actions}>
                    <div className="admin-users__actions">
                      <button
                        type="button"
                        onClick={() => open('edit', user)}
                        aria-label={`${copy.edit} ${user.name}`}
                      >
                        <Icon icon={pencilIcon} aria-hidden="true" />
                        {copy.edit}
                      </button>
                      <button
                        type="button"
                        className="admin-users__delete"
                        onClick={() => open('delete', user)}
                        disabled={
                          user.status !== 'DISABLED' ||
                          Boolean(user.deletionBlockedReason)
                        }
                        aria-label={`${copy.remove} ${user.name}`}
                      >
                        <Icon icon={trashIcon} aria-hidden="true" />
                        {copy.remove}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <p className="admin-users__help">{copy.deleteHint}</p>
      <nav
        className="admin-users__pagination"
        aria-label="Paginación de usuarios"
      >
        <button
          type="button"
          disabled={loading || page <= 1}
          onClick={() => setPage((value) => value - 1)}
        >
          {copy.previous}
        </button>
        <span>
          {copy.page} {page}
        </span>
        <button
          type="button"
          disabled={loading || page * result.pageSize >= result.total}
          onClick={() => setPage((value) => value + 1)}
        >
          {copy.next}
        </button>
      </nav>
      <dialog
        className="admin-users__dialog"
        ref={dialog}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        aria-labelledby="admin-dialog-title"
      >
        {selection && (
          <>
            <header>
              <h2 id="admin-dialog-title">
                {selection.mode === 'delete'
                  ? copy.deleteTitle
                  : selection.mode === 'create'
                    ? copy.createTitle
                    : copy.editTitle}
              </h2>
              <button
                type="button"
                aria-label={copy.close}
                onClick={close}
                disabled={saving}
              >
                <Icon icon={closeIcon} aria-hidden="true" />
              </button>
            </header>
            <form
              key={`${selection.mode}-${selection.user.id || 'new'}`}
              onSubmit={submit}
            >
              {selection.mode === 'delete' ? (
                <>
                  <p>
                    {copy.deleteText} <strong>{selection.user.email}</strong>
                  </p>
                  <label htmlFor="delete-email">
                    {copy.email}
                    <input
                      id="delete-email"
                      type="email"
                      name="emailConfirmation"
                      required
                      autoComplete="off"
                    />
                  </label>
                </>
              ) : (
                <>
                  <label htmlFor="admin-name">
                    {copy.name}
                    <input
                      id="admin-name"
                      name="name"
                      defaultValue={selection.user.name || ''}
                      required
                      maxLength={100}
                    />
                  </label>
                  <label htmlFor="admin-email">
                    {copy.email}
                    <input
                      id="admin-email"
                      name="email"
                      type="email"
                      defaultValue={selection.user.email || ''}
                      required
                      maxLength={254}
                    />
                  </label>
                  {selection.mode === 'create' && (
                    <label htmlFor="admin-password">
                      {copy.password}
                      <PasswordField id="admin-password" />
                      <small>{copy.passwordHint}</small>
                    </label>
                  )}
                  <div className="admin-users__row">
                    <label htmlFor="admin-role">
                      {copy.role}
                      <select
                        id="admin-role"
                        name="platformRole"
                        defaultValue={selection.user.platformRole || 'USER'}
                      >
                        <option value="USER">{copy.customer}</option>
                        <option value="ADMIN">{copy.admin}</option>
                      </select>
                    </label>
                    {selection.mode === 'edit' && (
                      <label htmlFor="admin-status">
                        {copy.status}
                        <select
                          id="admin-status"
                          name="status"
                          defaultValue={selection.user.status}
                        >
                          <option value="ACTIVE">{copy.active}</option>
                          <option value="DISABLED">{copy.disabled}</option>
                        </select>
                      </label>
                    )}
                  </div>
                  <label className="admin-users__checkbox">
                    <input
                      name="emailVerified"
                      type="checkbox"
                      defaultChecked={Boolean(selection.user.emailVerifiedAt)}
                    />
                    <span>{copy.verified}</span>
                  </label>
                  <small>{copy.verifiedHint}</small>
                </>
              )}
              <FormNotice>{dialogError}</FormNotice>
              <footer>
                <button type="button" onClick={close} disabled={saving}>
                  {copy.cancel}
                </button>
                <button
                  className={
                    selection.mode === 'delete'
                      ? 'admin-users__danger'
                      : 'admin-users__primary'
                  }
                  type="submit"
                  disabled={saving}
                >
                  {saving
                    ? copy.saving
                    : selection.mode === 'delete'
                      ? copy.deleteButton
                      : selection.mode === 'create'
                        ? copy.create
                        : copy.save}
                </button>
              </footer>
            </form>
          </>
        )}
      </dialog>
    </section>
  );
}
