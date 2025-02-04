import axios from 'axios';
import { ActionFunctionArgs } from 'react-router-dom';
import { BASE_FETCH_URL } from 'src/utils/constants';
import { Dog, Err } from 'src/utils/types';

const findMatch = async ({ request }: ActionFunctionArgs) => {
  const dogIds: string[] = await request.json();

  try {
    let response = await axios.post(`${BASE_FETCH_URL}/dogs/match`, dogIds, {
      withCredentials: true,
    });

    const matchId: string = response.data.match;

    response = await axios.post(`${BASE_FETCH_URL}/dogs`, [matchId], {
      withCredentials: true,
    });

    return response.data[0] as Dog;
  } catch (err) {
    console.error(err);
    return { errorMessage: 'Error fetching match!' } as Err;
  }
};

export default findMatch;
