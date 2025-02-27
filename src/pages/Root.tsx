import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  AUTH_EXPIRES_AT,
  DEFAULT_SEARCH_PARAMETERS,
} from 'src/utils/constants';
import { authExpired, toQueryString } from 'src/utils/helpers';

const Root = () => {
  const authExpiresAt = localStorage.getItem(AUTH_EXPIRES_AT);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (authExpired() && location.pathname !== '/login') {
      navigate('/login');
    }
  });

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

      <div className="py-[30px] px-[50px] flex flex-col ">
        <div className="mb-[50px] flex flex-col items-center gap-[10px]">
          <p className="text-purple-50 font-bold text-5xl">Fetch My Dawg!</p>
          <p className="italic text-purple-200">Find Your Perfect Match</p>
        </div>

        <main className="flex justify-center">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Root;
