import { Dog as DogType } from 'src/utils/types';
import Icons from 'src/icons';

type DogProps = {
  imgHeight?: number;
  dog: DogType;
  animationDelay?: number;
  favorite?: boolean;
  canFavorite?: boolean;
  onFavorite?: (dogId: string) => void;
  onUnfavorite?: (dogId: string) => void;
};

const DogCard = ({
  dog,
  animationDelay,
  favorite,
  imgHeight = 200,
  canFavorite = false,
  onFavorite = () => {},
  onUnfavorite = () => {},
}: DogProps) => {
  const renderFavoriteIcon = () => {
    if (canFavorite) {
      if (favorite) {
        return (
          <Icons.HeartFilled
            fill="#e11d48  "
            onClick={() => onUnfavorite(dog.id)}
          />
        );
      }
      return (
        <Icons.HeartUnfilled
          fill="#0c0a09 "
          onClick={() => onFavorite(dog.id)}
        />
      );
    }
    return null;
  };

  return (
    <div
      key={dog.id}
      style={{
        opacity: 0,
        animationDelay: `${animationDelay ?? 0}s`,
      }}
      className="flex flex-col w-full group rounded-lg
border-[1px] border-stone-500 shadow-lg animate-appear"
    >
      <img
        src={dog.img}
        style={{ height: imgHeight }}
        className="w-full object-cover rounded-t-lg"
      />

      <div className="bg-purple-50 flex flex-col flex-wrap px-3 py-2 rounded-b-lg">
        <div className="flex justify-between items-center">
          <p
            className="text-stone-800 text-2xl font-bold
        group-hover:underline underline-offset-4"
          >
            {dog.name}
          </p>

          {renderFavoriteIcon()}
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
  );
};

export default DogCard;
