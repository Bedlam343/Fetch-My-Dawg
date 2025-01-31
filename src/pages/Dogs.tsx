import { useLoaderData, useSearchParams } from 'react-router-dom';
import DogList from 'src/components/DogList';
import ArrowBack from 'src/icons/ArrowBack';
import ArrowForward from 'src/icons/ArrowForward';
import { Dog } from 'src/utils/types';

const Dogs = () => {
  const { dogs, next, prev } = useLoaderData();
  const [, setSearchParams] = useSearchParams();

  const handlePrev = () => {
    if (!prev) return;
    setSearchParams(prev.split('?')[1]);
  };

  const handleNext = () => {
    if (!next) return;
    setSearchParams(next.split('?')[1]);
  };

  return (
    <div className="flex flex-col  gap-[10px]">
      <DogList dogs={dogs as Dog[]} />

      <div className="flex justify-center gap-[100px] mt-[20px]">
        <ArrowBack
          width={30}
          height={30}
          fill="#cbd5e1"
          disabled={!prev}
          onClick={handlePrev}
          text="Prev"
        />

        <ArrowForward
          width={30}
          height={30}
          fill="#cbd5e1"
          disabled={!next}
          onClick={handleNext}
          text="Next"
        />
      </div>
    </div>
  );
};

export default Dogs;
