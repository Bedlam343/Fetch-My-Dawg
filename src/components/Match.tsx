import DogCard from 'src/components/DogCard';
import { Dog } from 'src/utils/types';
import Modal from './common/Modal';

type MatchProps = {
  dog: Dog;
  onClose: () => void;
};

const Match = ({ dog, onClose }: MatchProps) => {
  if (!dog) return null;

  return (
    <Modal open={true} onClose={onClose}>
      <div style={{ transform: 'translateY(-50px)' }}>
        <p className="text-purple-100 text-3xl text-center mb-[20px]">
          Match Found!
        </p>
        <div className="w-[500px] h-[300px]">
          <DogCard dog={dog} imgHeight={300} />
        </div>
      </div>
    </Modal>
  );
};

export default Match;
