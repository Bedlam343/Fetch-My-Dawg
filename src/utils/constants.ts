export const BASE_FETCH_URL = 'https://frontend-take-home-service.fetch.com';
export const AUTH_WINDOW_MS = 60 * 1000 * 60; // 1 hour

export const AUTH_EXPIRES_AT = 'auth_expires_at';

export const DEFAULT_SEARCH_PARAMETERS = {
  size: '25',
  from: '0',
  sort: 'breed:asc',
};

export enum SortField {
  Breed = 'breed',
  Name = 'name',
  Age = 'age',
}
export const DEFAULT_SORT_FIELD: SortField = SortField.Name;
