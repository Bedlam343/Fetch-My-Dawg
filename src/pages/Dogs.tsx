import { useEffect, useRef, useState } from 'react';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import DogList from 'src/components/DogList';
import { getBreeds } from 'src/service';
import Icons from 'src/icons';
import Filters from 'src/components/Filters';
import { Dog, SortDirection } from 'src/utils/types';
import { DEFAULT_SEARCH_PARAMETERS, SortField } from 'src/utils/constants';

type LoaderData = {
  dogs: Dog[];
  next: string | undefined;
  prev: string | undefined;
};

const Dogs = () => {
  const [favorites, setFavorties] = useState<{ [k: string]: boolean }>({});
  const [breeds, setBreeds] = useState<string[]>([]);

  const { dogs, next, prev } = useLoaderData<LoaderData>();
  const [searchParams, setSearchParams] = useSearchParams({
    ...DEFAULT_SEARCH_PARAMETERS,
  });

  const filtersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchBreeds = async () => {
      setBreeds(await getBreeds());
    };
    fetchBreeds();
  }, []);

  useEffect(() => {
    if (filtersRef.current) {
      filtersRef.current.scrollIntoView({
        behavior: 'instant',
        block: 'center',
      });
    }
  }, [dogs]);

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

  const setSortDirection = (newDirection: SortDirection) => {
    const sort = searchParams.get('sort')!;
    const [field, sortDirection] = sort.split(':');

    if (newDirection === sortDirection) return;

    if (sortDirection === 'asc') {
      newDirection = 'desc';
    } else {
      newDirection = 'asc';
    }

    searchParams.set('sort', `${field}:${newDirection}`);
    setSearchParams(searchParams);
  };

  const setBreed = (breed: string) => {
    if (!breed) {
      searchParams.delete('breeds');
    } else {
      searchParams.set('breeds', [breed].toString());
    }

    setSearchParams(searchParams);
  };

  const setSortField = (newField: SortField) => {
    const sort = searchParams.get('sort')!;
    const [field, sortDirection] = sort.split(':');

    if (field === newField) return;

    searchParams.set('sort', `${newField}:${sortDirection}`);
    setSearchParams(searchParams);
  };

  return (
    <div className="flex flex-col items-center">
      <Filters
        breeds={breeds}
        sortDirection={searchParams.get('sort')!.split(':')[1] as SortDirection}
        selectedBreed={searchParams.get('breeds') ?? ''}
        onSetSortDirection={setSortDirection}
        onSelectBreed={setBreed}
        onSetSortField={setSortField}
        ref={filtersRef}
      />

      <DogList
        dogs={dogs}
        favorites={favorites}
        onFavorite={handleFavorite}
        onUnfavorite={handleUnfavorite}
      />

      <div className="flex justify-center gap-[100px] mt-[60px]">
        <Icons.ArrowBack
          width={40}
          height={40}
          fill="white"
          disabled={!prev}
          onClick={handlePrev}
          text="Prev"
        />

        <Icons.ArrowForward
          width={40}
          height={40}
          fill="white"
          disabled={!next}
          onClick={handleNext}
          text="Next"
        />
      </div>
    </div>
  );
};

export default Dogs;
