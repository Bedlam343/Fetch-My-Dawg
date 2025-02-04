import { Dog as DogType } from 'src/utils/types';
import DogCard from 'src/components/DogCard';

type DogListProps = {
  dogs: DogType[];
  appearAnimation?: boolean;
  favorites: { [k: string]: DogType };
  onFavorite: (id: string) => void;
  onUnfavorite: (id: string) => void;
};

const DogList = ({
  dogs,
  favorites,
  appearAnimation = false,
  onFavorite,
  onUnfavorite,
}: DogListProps) => {
  if (dogs.length === 0) {
    return <div className="text-purple-50 text-lg">No Dogs Found.</div>;
  }
  return (
    <div
      className="flex gap-[25px] md:gap-[35px] flex-wrap justify-center 
      max-w-[1200px] text-slate-900"
    >
      {dogs.map((dog, index) => (
        <div key={dog.id} className="w-[250px]">
          <DogCard
            dog={dog}
            animationDelay={appearAnimation ? 0.1 * index : 0}
            canFavorite
            favorite={Boolean(favorites[dog.id])}
            onFavorite={onFavorite}
            onUnfavorite={onUnfavorite}
          />
        </div>
      ))}
    </div>
  );
};

export default DogList;
