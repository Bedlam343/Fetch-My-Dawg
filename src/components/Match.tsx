import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import DogCard from 'src/components/DogCard';
import { Dog } from 'src/utils/types';

type MatchProps = {
  dog: Dog;
  onClose: () => void;
};

const Match = ({ dog, onClose }: MatchProps) => {
  const childrenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preventScroll = (e) => e.preventDefault();

    document.addEventListener('wheel', preventScroll, { passive: false });
    document.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      document.removeEventListener('wheel', preventScroll);
      document.removeEventListener('touchmove', preventScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        childrenRef.current &&
        !childrenRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!dog) return null;

  return (
    <>
      {createPortal(
        <div
          className="fixed w-[100%] h-[100%] top-0 z-50 left-0 bg-black 
          flex items-center justify-center bg-opacity-80"
        >
          <div ref={childrenRef} style={{ transform: 'translateY(-50px)' }}>
            <p className="text-purple-100 text-3xl text-center mb-[20px]">
              Match Found!
            </p>
            <div className="w-[500px] h-[300px]">
              <DogCard dog={dog} imgHeight={300} />
            </div>
          </div>
        </div>,
        document.getElementById('overlays')!
      )}
    </>
  );
};

export default Match;
