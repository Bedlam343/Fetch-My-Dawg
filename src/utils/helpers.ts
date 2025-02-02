import { AUTH_EXPIRES_AT } from './constants';

export const toQueryString = (obj: object) => {
  const searchParams = new URLSearchParams();
  Object.entries(obj).forEach(([key, value]) => {
    searchParams.append(key, value);
  });
  return searchParams.toString();
};

export const authExpired = (): boolean => {
  const authExpiresAt = localStorage.getItem(AUTH_EXPIRES_AT);
  return !authExpiresAt || Number(authExpiresAt) <= Date.now();
};
