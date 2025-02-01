import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AUTH_EXPIRES_AT } from 'src/utils/constants';

const Root = () => {
  const authExpiresAt = localStorage.getItem(AUTH_EXPIRES_AT);
  const navigate = useNavigate();

  useEffect(() => {
    // navigate to login page is auth expired
    if (!authExpiresAt || Number(authExpiresAt) <= Date.now()) {
      navigate('/login');
    } else {
      navigate('/dogs/search');
    }
  }, [navigate, authExpiresAt]);

  return (
    <div className="py-[30px] flex flex-col gap-[50px]">
      <p className="text-center text-slate-300 font-bold text-4xl">
        Fetch My Dawg!
      </p>

      <main className="flex justify-center">
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
