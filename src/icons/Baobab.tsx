import React from 'react';
import { Icon } from '../Icon';
import { IconProps } from '../types';

export const Baobab: React.FC<IconProps> = (props) => {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <path d="M12 2v20"/> <path d="M8 8h8"/> <path d="M8 12h8"/> <path d="M8 16h8"/> <circle cx="12" cy="4" r="2"/> <path d="M6 20h12"/> <path d="M8 20v-4"/> <path d="M16 20v-4"/> <path d="M10 8v8"/> <path d="M14 8v8"/>
    </Icon>
  );
};

Baobab.displayName = 'Baobab';
