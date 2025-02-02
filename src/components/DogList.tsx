import { Dog } from 'src/utils/types';
import Icons from 'src/icons';

type DogListProps = {
  dogs: Dog[];
  favorites: { [k: string]: boolean };
  onFavorite: (id: string) => void;
  onUnfavorite: (id: string) => void;
};

const DogList = ({
  dogs,
  favorites,
  onFavorite,
  onUnfavorite,
}: DogListProps) => {
  return (
    <div
      className="flex gap-[25px] md:gap-[40px] flex-wrap justify-between
      max-w-[1200px] text-slate-900"
    >
      {dogs.map((dog) => (
        <div
          key={dog.id}
          className="flex flex-col w-[250px] group rounded-sm
        border-[1px] border-stone-500"
        >
          <img
            src={dog.img}
            className="w-[250px] h-[150px] object-cover rounded-t-sm"
          />

          <div className="bg-stone-900 flex flex-col flex-wrap px-3 py-2 rounded-b-sm">
            <div className="flex justify-between items-center">
              <p
                className="text-orange-600 text-xl font-bold
                group-hover:underline underline-offset-4"
              >
                {dog.name}
              </p>

              {favorites[dog.id] ? (
                <Icons.HeartFilled onClick={() => onUnfavorite(dog.id)} />
              ) : (
                <Icons.HeartUnfilled onClick={() => onFavorite(dog.id)} />
              )}
            </div>

            <p className="text-orange-200 text-md mb-[4px] font-light">
              {dog.breed}
            </p>
            <p className="text-orange-200 text-md font-light">
              <span className="text-orange-300">Age:</span> {dog.age}
            </p>

            <p className="text-orange-200 text-md font-light">
              <span className="text-orange-300">Zip Code</span>: {dog.zip_code}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DogList;
