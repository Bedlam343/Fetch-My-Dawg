import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import queryClient from 'src/queryClient';
import Root from 'src/pages/Root';
import Dogs from 'src/pages/Dogs';
import Login from 'src/pages/Login';
import { login, findMatch } from 'src/pages/actions';
import { fetchDogsLoader } from 'src/pages/loaders';
import { QueryClientProvider } from '@tanstack/react-query';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="login" element={<Login />} action={login} />
      <Route
        path="dogs/search"
        element={<Dogs />}
        action={findMatch}
        loader={fetchDogsLoader}
      />
    </Route>
  )
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
