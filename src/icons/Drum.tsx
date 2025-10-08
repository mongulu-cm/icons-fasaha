import React from 'react';
import { Icon } from '../Icon';
import { IconProps } from '../types';

export const Drum: React.FC<IconProps> = (props) => {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <ellipse cx="12" cy="8" rx="8" ry="3"/> <ellipse cx="12" cy="16" rx="8" ry="3"/> <path d="M4 8v8"/> <path d="M20 8v8"/> <path d="M8 8v8"/> <path d="M16 8v8"/> <circle cx="12" cy="8" r="1"/> <circle cx="12" cy="16" r="1"/>
    </Icon>
  );
};

Drum.displayName = 'Drum';
