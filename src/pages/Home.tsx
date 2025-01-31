import { useLoaderData } from 'react-router-dom';
import DogList from 'src/components/DogList';
import { Dog } from 'src/utils/types';

const Home = () => {
  const { dogs, next, prev } = useLoaderData();

  console.log(dogs);

  return (
    <>
      <DogList dogs={dogs as Dog[]} />
    </>
  );
};

export default Home;
