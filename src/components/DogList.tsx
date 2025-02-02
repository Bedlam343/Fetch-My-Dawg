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
      className="flex gap-[25px] md:gap-[40px] flex-wrap justify-center md:justify-between
      max-w-[1200px] text-slate-900"
    >
      {dogs.map((dog, index) => (
        <div
          key={dog.id}
          style={{
            opacity: 0,
            animationDelay: `${0.1 * index}s`,
          }}
          className="flex flex-col w-[250px] group rounded-lg
        border-[1px] border-stone-500 shadow-lg animate-appear"
        >
          <img
            src={dog.img}
            className="w-[250px] h-[150px] object-cover rounded-t-lg"
          />

          <div className="bg-purple-50 flex flex-col flex-wrap px-3 py-2 rounded-b-lg">
            <div className="flex justify-between items-center">
              <p
                className="text-stone-800 text-2xl font-bold
                group-hover:underline underline-offset-4"
              >
                {dog.name}
              </p>

              {favorites[dog.id] ? (
                <Icons.HeartFilled
                  fill="#0c0a09 "
                  onClick={() => onUnfavorite(dog.id)}
                />
              ) : (
                <Icons.HeartUnfilled
                  fill="#0c0a09 "
                  onClick={() => onFavorite(dog.id)}
                />
              )}
            </div>

            <p className="text-stone-800 text-lg mb-[4px]">{dog.breed}</p>
            <p className="text-stone-900 text-md">
              Age: <span className="font-light">{dog.age}</span>
            </p>

            <p className="text-stone-950 text-md">
              Zip Code: <span className="font-light">{dog.zip_code}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DogList;
