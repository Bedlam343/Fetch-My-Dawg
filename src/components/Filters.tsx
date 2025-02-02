import { ChangeEvent } from 'react';
import Icons from 'src/icons';
import { DEFAULT_SORT_FIELD, SortField } from 'src/utils/constants';
import { SortDirection } from 'src/utils/types';

type FilterProps = {
  breeds: string[];
  sortDirection: SortDirection;
  selectedBreed: string;
  onSelectBreed: (breed: string) => void;
  onSetSortDirection: (direc: SortDirection) => void;
  onSetSortField: (field: SortField) => void;
};

const Filters = ({
  breeds,
  sortDirection,
  onSelectBreed,
  onSetSortDirection,
  onSetSortField,
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
    border-stone-400 border-dotted py-3 gap-[40px] items-center"
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

      <div className="flex items-center gap-[10px]">
        <div>
          <p className="text-stone-200">Sort By:</p>
        </div>

        <select
          className="text-center w-[100px] bg-black bg-opacity-50 text-slate-100
        text-ellipsis rounded-lg border-[1px] border-stone-600 h-[40px]"
          defaultValue={DEFAULT_SORT_FIELD}
          onChange={(e) =>
            onSetSortField(SortField[e.target.value as keyof typeof SortField])
          }
        >
          {Object.keys(SortField).map((field) => (
            <option
              key={field}
              className="text-sm w-[200px] px-2 overflow-ellipsis
        text-stone-900 bg-white"
            >
              {field}
            </option>
          ))}
        </select>

        <div
          className="flex h-[35px] border-2 border-stone-200 items-center
        rounded-sm"
        >
          <div
            onClick={() => onSetSortDirection('asc')}
            className={`h-full hover:cursor-pointer w-[75px] hover:text-stone-700
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
            className={`h-full hover:cursor-pointer w-[75px]
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
    </div>
  );
};

export default Filters;
