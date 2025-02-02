import { ChangeEvent } from 'react';
import Icons from 'src/icons';
import { SortDirection } from 'src/utils/types';

type FilterProps = {
  breeds: string[];
  sortDirection: SortDirection;
  selectedBreed: string;
  onSelectBreed: (breed: string) => void;
  onSetSortDirection: (direc: SortDirection) => void;
};

const Filters = ({
  breeds,
  sortDirection,
  onSelectBreed,
  onSetSortDirection,
}: FilterProps) => {
  const handleBreedSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const breed = e.target.value;
    if (breed === 'All Breeds') {
      onSelectBreed('');
      return;
    }
    onSelectBreed(breed);
  };
  return (
    <div
      className="flex w-full mb-[50px] border-b-[1px]
  border-stone-400 border-dotted py-3 gap-[30px] items-center"
    >
      <div className="flex">
        <Icons.Filter height={30} width={30} fill="white" />
        <p className="text-stone-200 text-xl">Filters:</p>
      </div>

      <select
        className="text-center w-[200px] bg-black bg-opacity-50 text-slate-100
      text-ellipsis rounded-lg border-[1px] border-stone-600 h-[40px]"
        defaultValue="All Breeds"
        onChange={handleBreedSelectChange}
      >
        <option className="text-slate-100">All Breeds</option>
        {breeds.map((breed) => (
          <option
            key={breed}
            className="text-sm w-[200px] px-2 overflow-ellipsis
        text-stone-900 bg-white"
          >
            {breed}
          </option>
        ))}
      </select>

      <div
        className="flex h-[40px] border-2 border-stone-200 items-center
        rounded-sm"
      >
        <div
          onClick={() => onSetSortDirection('asc')}
          className={`h-full hover:cursor-pointer w-[100px] hover:text-stone-700
          hover:bg-stone-200 flex items-center justify-center ${
            sortDirection === 'asc'
              ? 'bg-stone-200 text-stone-700'
              : ' text-stone-200'
          }`}
        >
          Asc
        </div>
        <div className="h-full w-[1px] bg-white" />
        <div
          onClick={() => onSetSortDirection('desc')}
          className={`h-full hover:cursor-pointer w-[100px]
          flex items-center justify-center ${
            sortDirection === 'desc'
              ? 'bg-stone-200 text-stone-700'
              : 'text-stone-200 hover:text-stone-700 hover:bg-stone-200'
          }`}
        >
          Desc
        </div>
      </div>
    </div>
  );
};

export default Filters;
