import axios from 'axios';
import { BASE_FETCH_URL } from 'src/utils/constants';
import { Dog } from 'src/utils/types';

export const getBreeds = async () => {
  const response = await axios.get(`${BASE_FETCH_URL}/dogs/breeds`, {
    withCredentials: true,
  });
  return response.data;
};

export const getDogs = async (params: { [k: string]: string }) => {
  try {
    console.log('dogs search');
    let response = await axios.get(`${BASE_FETCH_URL}/dogs/search`, {
      params,
      withCredentials: true,
    });

    const { resultIds, next, prev } = response.data;

    response = await axios.post(`${BASE_FETCH_URL}/dogs`, resultIds, {
      withCredentials: true,
    });

    const dogs = response.data as Dog[];
    return { dogs, next: next as string, prev: prev as string };
  } catch (err) {
    console.error(err);
    return undefined;
  }
};
