import { Dog } from 'src/utils/types';
import Icons from 'src/icons';

type DogListProps = {
  dogs: Dog[];
};

const DogList = ({ dogs }: DogListProps) => {
  return (
    <div className="flex gap-[50px] flex-wrap justify-center max-w-[1200px] text-slate-900">
      {dogs.map((dog) => (
        <div key={dog.id} className="flex flex-col gap-[5px] w-[175px] group">
          <img src={dog.img} className="w-[175px] h-[175px] object-cover" />
          <div className="flex flex-col flex-wrap mt-[2px]">
            <div className="flex justify-between items-center">
              <p
                className="text-slate-300 text-xl font-bold
                group-hover:underline underline-offset-4"
              >
                {dog.name}
              </p>

              <Icons.HeartUnfilled />
            </div>

            <p className="text-slate-500 text-md">
              <span className="text-slate-400">Age</span>: {dog.age}
            </p>
            <p className="text-slate-500 text-md">
              <span className="text-slate-400">Breed</span>: {dog.breed}
            </p>
            <p className="text-slate-500 text-md">
              <span className="text-slate-400">Zip Code</span>: {dog.zip_code}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DogList;
