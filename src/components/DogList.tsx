import { Dog } from 'src/utils/types';

type DogListProps = {
  dogs: Dog[];
};

const DogList = ({ dogs }: DogListProps) => {
  return (
    <div className="flex gap-[50px] flex-wrap justify-center max-w-[1200px] text-slate-900">
      {dogs.map((dog) => (
        <div key={dog.id} className="flex flex-col gap-[5px]">
          <img src={dog.img} className="w-[200px] h-[200px] object-cover" />
          <div>
            <div className="flex justify-between items-baseline">
              <p className="text-slate-300 text-xl font-bold">{dog.name}</p>
              <p className="text-slate-400 text-md">Age: {dog.age}</p>
            </div>
            <p className="text-slate-500 text-lg mt-[3px]">{dog.breed}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DogList;
