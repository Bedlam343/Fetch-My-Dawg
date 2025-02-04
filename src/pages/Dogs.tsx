import { useEffect, useMemo, useRef, useState } from 'react';
import {
  useActionData,
  useLoaderData,
  useSearchParams,
  useSubmit,
} from 'react-router-dom';
import DogList from 'src/components/DogList';
import { getBreeds } from 'src/service';
import Icons from 'src/icons';
import Filters from 'src/components/Filters';
import { Dog, Err, SortDirection } from 'src/utils/types';
import { DEFAULT_SEARCH_PARAMETERS, SortField } from 'src/utils/constants';
import useDynamicScrollbar from 'src/hooks/useDynamicScrollbar';
import Match from 'src/components/Match';
import Spinner from 'src/components/common/Spinner';
import Modal from 'src/components/common/Modal';

type LoaderData = {
  dogs: Dog[];
  next: string | undefined;
  prev: string | undefined;
};

const Dogs = () => {
  const [favorites, setFavorties] = useState<{ [k: string]: Dog }>({});
  const [breeds, setBreeds] = useState<string[]>([]);
  const [displayFavorites, setDisplayFavorites] = useState<boolean>(false);
  const [displayMatch, setDisplayMatch] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const match = useActionData<Dog | Err>();
  const data = useLoaderData<LoaderData>();
  const [searchParams, setSearchParams] = useSearchParams({
    ...DEFAULT_SEARCH_PARAMETERS,
  });
  const submit = useSubmit();

  const filtersRef = useRef<HTMLDivElement>(null);

  const numFavorites = useMemo(
    () => Object.keys(favorites).length,
    [favorites]
  );
  const favoriteDogs = useMemo(
    () => Object.keys(favorites).map((key) => favorites[key]),
    [favorites]
  );

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
  }, [data?.dogs]);

  useEffect(() => {
    setLoading(false);
    if (match && 'id' in match) {
      setDisplayMatch(true);
    }
  }, [match]);

  useDynamicScrollbar();

  const handlePrev = () => {
    if (!data.prev) return;
    setSearchParams(data.prev.split('?')[1]);
  };

  const handleNext = () => {
    if (!data.next) return;
    setSearchParams(data.next.split('?')[1]);
  };

  const handleFavorite = (dogId: string) => {
    const dog = data.dogs.find((dog) => dog.id === dogId);
    if (!dog) return;
    setFavorties((prevFavorites) => ({
      ...prevFavorites,
      [dogId]: dog,
    }));
  };

  const handleUnfavorite = (dogId: string) => {
    setFavorties((prevFavorites) => {
      const updatedFavorites = { ...prevFavorites };
      delete updatedFavorites[dogId];
      return updatedFavorites;
    });
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
    searchParams.set('from', '0');
    setSearchParams(searchParams);
  };

  const setBreed = (breed: string) => {
    if (!breed) {
      searchParams.delete('breeds');
    } else {
      searchParams.set('breeds', [breed].toString());
    }

    searchParams.set('from', '0');

    setSearchParams(searchParams);
  };

  const setSortField = (newField: SortField) => {
    const sort = searchParams.get('sort')!;
    const [field, sortDirection] = sort.split(':');

    if (field === newField) return;

    searchParams.set('sort', `${newField}:${sortDirection}`);
    searchParams.set('from', '0');
    setSearchParams(searchParams);
  };

  const resetFilters = () => {
    setSearchParams({ ...DEFAULT_SEARCH_PARAMETERS });
  };

  const handleFindMatch = () => {
    setLoading(true);
    const dogIds: string[] = Object.keys(favorites);
    submit(JSON.stringify(dogIds), {
      method: 'POST',
      encType: 'application/json',
    });
  };

  const toggleDisplayMatch = () => {
    setDisplayMatch(!displayMatch);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[1200px]">
      <Filters
        breeds={breeds}
        sortDirection={searchParams.get('sort')!.split(':')[1] as SortDirection}
        selectedBreed={searchParams.get('breeds') ?? ''}
        onSetSortDirection={setSortDirection}
        onSelectBreed={setBreed}
        onSetSortField={setSortField}
        onResetFilters={resetFilters}
        ref={filtersRef}
        disabled={displayFavorites}
      />

      <div className="flex mt-[40px] mb-[40px]  items-center">
        <div
          className={`text-purple-50 px-4 hover:underline
          underline-offset-2 hover:cursor-pointer text-xl ${
            displayFavorites ? '' : 'underline'
          }`}
          onClick={() => setDisplayFavorites(false)}
        >
          Search Results
        </div>
        <div className="h-full w-[2px] bg-purple-50" />
        <div
          className={`text-purple-50 px-4 hover:underline
          underline-offset-2 hover:cursor-pointer text-xl ${
            displayFavorites ? 'underline' : ''
          }`}
          onClick={() => setDisplayFavorites(true)}
        >
          Favorites <span className="text-xl">({numFavorites})</span>
        </div>
        <div className="h-full w-[2px] bg-purple-50" />
        <div className="px-4">
          <button
            onClick={handleFindMatch}
            disabled={!favoriteDogs.length}
            className={`text-purple-50 border-[1px] border-rose-400
            rounded-md px-2 py-1 hover:border-rose-500
            ${
              !favoriteDogs.length
                ? 'hover:cursor-not-allowed opacity-40'
                : 'hover:cursor-pointer'
            }`}
          >
            Find Match
          </button>
        </div>
      </div>

      {data?.dogs && (
        <DogList
          dogs={displayFavorites ? favoriteDogs : data.dogs}
          favorites={favorites}
          onFavorite={handleFavorite}
          onUnfavorite={handleUnfavorite}
          appearAnimation={!displayFavorites}
        />
      )}
      {!displayFavorites && (
        <div className="flex justify-center gap-[100px] mt-[60px]">
          <Icons.ArrowBack
            width={40}
            height={40}
            fill="white"
            disabled={!data?.prev}
            onClick={handlePrev}
            text="Prev"
          />

          <Icons.ArrowForward
            width={40}
            height={40}
            fill="white"
            disabled={!data?.next}
            onClick={handleNext}
            text="Next"
          />
        </div>
      )}

      {displayMatch && (
        <Match dog={match as Dog} onClose={toggleDisplayMatch} />
      )}

      {loading && (
        <Modal open={loading} onClose={() => {}}>
          <Spinner text="Finding Match..." />
        </Modal>
      )}
    </div>
  );
};

export default Dogs;
