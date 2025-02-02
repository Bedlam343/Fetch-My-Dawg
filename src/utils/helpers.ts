export const toQueryString = (obj: object) => {
  const searchParams = new URLSearchParams();
  Object.entries(obj).forEach(([key, value]) => {
    searchParams.append(key, value);
  });
  return searchParams.toString();
};
