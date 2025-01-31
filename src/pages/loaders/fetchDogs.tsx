import { LoaderFunctionArgs } from 'react-router-dom';
import queryClient from 'src/queryClient';
import { getDogs } from 'src/service';

const fetchDogsLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = Object.fromEntries(url.searchParams.entries());

  const data = await queryClient.fetchQuery({
    queryKey: ['dogs', searchParams],
    queryFn: () => getDogs(searchParams),
  });

  return data;
};

export default fetchDogsLoader;
