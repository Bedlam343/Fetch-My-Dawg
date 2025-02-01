import { useLoaderData, useSearchParams } from 'react-router-dom';
import DogList from 'src/components/DogList';
import { Dog } from 'src/utils/types';
import Icons from 'src/icons';
import { useState } from 'react';

type LoaderData = {
  dogs: Dog[];
  next: string | undefined;
  prev: string | undefined;
};

const Dogs = () => {
  const [favorites, setFavorties] = useState<{ [k: string]: boolean }>({});
  const { dogs, next, prev } = useLoaderData<LoaderData>();
  const [, setSearchParams] = useSearchParams();

  const handlePrev = () => {
    if (!prev) return;
    setSearchParams(prev.split('?')[1]);
  };

  const handleNext = () => {
    if (!next) return;
    setSearchParams(next.split('?')[1]);
  };

  const handleFavorite = (dogId: string) => {
    setFavorties((prevFavorites) => ({ ...prevFavorites, [dogId]: true }));
  };

  const handleUnfavorite = (dogId: string) => {
    setFavorties((prevFavorites) => ({ ...prevFavorites, [dogId]: false }));
  };

  return (
    <div className="flex flex-col  gap-[10px]">
      <DogList
        dogs={dogs}
        favorites={favorites}
        onFavorite={handleFavorite}
        onUnfavorite={handleUnfavorite}
      />

      <div className="flex justify-center gap-[100px] mt-[20px]">
        <Icons.ArrowBack
          width={30}
          height={30}
          fill="#cbd5e1"
          disabled={!prev}
          onClick={handlePrev}
          text="Prev"
        />

        <Icons.ArrowForward
          width={30}
          height={30}
          fill="#cbd5e1"
          disabled={!next}
          onClick={handleNext}
          text="Next"
        />
      </div>
    </div>
  );
};

export default Dogs;
