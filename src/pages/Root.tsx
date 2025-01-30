import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AUTH_EXPIRES_AT } from 'src/utils/constants';

const Root = () => {
  const authExpiresAt = localStorage.getItem(AUTH_EXPIRES_AT);
  const navigate = useNavigate();

  useEffect(() => {
    // navigate to login page is auth expired
    if (!authExpiresAt || Number(authExpiresAt) <= Date.now()) {
      console.log('navigating to login page');
      navigate('/login');
    } else {
      navigate('/home');
    }
  }, [navigate, authExpiresAt]);

  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Root;
