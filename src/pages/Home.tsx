import { useLoaderData } from 'react-router-dom';
import { Dog } from 'src/utils/types';

const Home = () => {
  const { dogs, next, prev } = useLoaderData();

  return (
    <div className="flex gap-[20px] flex-wrap">
      {(dogs as Dog[]).map((dog) => (
        <div key={dog.id}>
          <img src={dog.img} className="w-[200px] h-[200px] object-cover" />
        </div>
      ))}
    </div>
  );
};

export default Home;
