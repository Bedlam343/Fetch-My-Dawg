import axios from 'axios';
import { ActionFunctionArgs, redirect } from 'react-router-dom';
import {
  AUTH_EXPIRES_AT,
  AUTH_WINDOW_MS,
  BASE_FETCH_URL,
} from 'src/utils/constants';

const login = async ({ request }: ActionFunctionArgs) => {
  const data = await request.formData();
  const name = data.get('name');
  const email = data.get('email');

  try {
    await axios.post(
      `${BASE_FETCH_URL}/auth/login`,
      {
        name,
        email,
      },
      { withCredentials: true }
    );

    // set expiration time of auth in local storage
    const authExpiresAt = Date.now() + AUTH_WINDOW_MS;
    localStorage.setItem(AUTH_EXPIRES_AT, authExpiresAt.toString());
    console.log('redirecting to home');
    return redirect('/dogs/search');
  } catch (err) {
    console.error(err);
    return 'Error logging in!';
  }
};

export default login;
