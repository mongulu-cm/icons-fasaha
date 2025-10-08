import React from 'react';
import { Icon } from '../Icon';
import { IconProps } from '../types';

export const Elephant: React.FC<IconProps> = (props) => {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <path d="M3 12h18"/> <path d="M3 6h18"/> <path d="M3 18h18"/> <circle cx="6" cy="6" r="2"/> <circle cx="6" cy="12" r="2"/> <circle cx="6" cy="18" r="2"/> <circle cx="18" cy="6" r="2"/> <circle cx="18" cy="12" r="2"/> <circle cx="18" cy="18" r="2"/> <path d="M9 6h6"/> <path d="M9 12h6"/> <path d="M9 18h6"/>
    </Icon>
  );
};

Elephant.displayName = 'Elephant';
