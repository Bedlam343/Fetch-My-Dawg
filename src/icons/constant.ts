import { IconProps } from './types';

export const applyClass = (props: IconProps) => {
  return `${
    props.disabled
      ? 'hover:cursor-not-allowed opacity-50'
      : 'hover:cursor-pointer '
  }`;
};
