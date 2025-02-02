import { FunctionComponent } from 'react';
import { IconProps } from 'src/icons/types';

type WrapperProps = {
  onClick?: () => void;
  disabled?: boolean;
  height?: number;
  width?: number;
  fill?: string;
  tooltip?: string;
  tooltipPosition?: 'top' | 'bottom';
  text?: string;
};

const withIconWrapper = (WrappedIcon: FunctionComponent<IconProps>) => {
  return ({
    onClick = () => {},
    disabled,
    height = 20,
    width = 20,
    fill = '#cbd5e1',
    text = '',
  }: WrapperProps) => (
    <div
      onClick={disabled ? () => {} : onClick}
      className={`group ${
        disabled
          ? 'opacity-50 hover:cursor-not-allowed'
          : 'hover:cursor-pointer'
      }`}
    >
      <WrappedIcon height={height} width={width} fill={fill} />
      {text && <p style={{ color: fill }}>{text}</p>}
    </div>
  );
};

export const wrapIcons = (icons: FunctionComponent<IconProps>[]) => {
  const wrappedIcons: { [k: string]: FunctionComponent<WrapperProps> } = {};
  icons.forEach((icon) => (wrappedIcons[icon.name] = withIconWrapper(icon)));
  return wrappedIcons;
};
