import { applyClass } from './constant';
import { IconProps } from './types';

const ArrowBack = (props: IconProps) => {
  return (
    <div onClick={props.onClick} className={applyClass(props)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height={props.height}
        viewBox="0 -960 960 960"
        width={props.width}
        fill={props.fill}
      >
        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
      </svg>
      {props.text && <p style={{ color: props.fill }}>{props.text}</p>}
    </div>
  );
};

export default ArrowBack;
