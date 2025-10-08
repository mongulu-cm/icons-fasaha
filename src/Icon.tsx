import React from 'react';
import { IconProps } from './types';

interface IconBaseProps extends IconProps {
  children: React.ReactNode;
  viewBox?: string;
}

export const Icon: React.FC<IconBaseProps> = ({
  size = 24,
  color = 'currentColor',
  className = '',
  style = {},
  onClick,
  children,
  viewBox = '0 0 24 24',
  ...props
}) => {
  const iconStyle: React.CSSProperties = {
    width: size,
    height: size,
    fill: color,
    display: 'inline-block',
    verticalAlign: 'middle',
    ...style,
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      style={iconStyle}
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </svg>
  );
};
