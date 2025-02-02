import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  AUTH_EXPIRES_AT,
  DEFAULT_SEARCH_PARAMETERS,
} from 'src/utils/constants';
import { toQueryString } from 'src/utils/helpers';

const Root = () => {
  const authExpiresAt = localStorage.getItem(AUTH_EXPIRES_AT);
  const navigate = useNavigate();

  useEffect(() => {
    // navigate to login page is auth expired
    if (!authExpiresAt || Number(authExpiresAt) <= Date.now()) {
      navigate('/login');
    } else {
      navigate(`/dogs/search?${toQueryString(DEFAULT_SEARCH_PARAMETERS)}`);
    }
  }, [navigate, authExpiresAt]);

  return (
    <div>
      <div className="fixed top-0 left-0 w-screen h-screen -z-20">
        <img
          src="/dog_background3.jpg"
          className="w-[100%] h-[100%] object-cover transform rotate-180"
        />
      </div>

      <div
        className="fixed top-0 left-0 w-screen h-screen -z-10 
        pointer-events-none bg-gradient-to-b from-black/75 to-black/50"
      />

      <div className="py-[30px] px-[50px] flex flex-col gap-[50px]">
        <p className="text-center text-fuchsia-100 font-bold text-5xl">
          Fetch My Dawg!
        </p>

        <main className="flex justify-center">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Root;
