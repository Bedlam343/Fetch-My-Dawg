import { applyClass } from './constant';
import { IconProps } from './types';

const ArrowForward = (props: IconProps) => {
  return (
    <div onClick={props.onClick} className={applyClass(props)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height={props.height}
        viewBox="0 -960 960 960"
        width={props.width}
        fill={props.fill}
      >
        <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
      </svg>
      {props.text && <p style={{ color: props.fill }}>{props.text}</p>}
    </div>
  );
};

export default ArrowForward;
