import React$1 from 'react';

interface IconProps {
    size?: number | string;
    color?: string;
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}
interface IconComponent extends React.FC<IconProps> {
    displayName?: string;
}

interface IconBaseProps extends IconProps {
    children: React$1.ReactNode;
    viewBox?: string;
}
declare const Icon: React$1.FC<IconBaseProps>;

declare const Baobab: React$1.FC<IconProps>;

declare const Drum: React$1.FC<IconProps>;

declare const Elephant: React$1.FC<IconProps>;

declare const Example: React$1.FC<IconProps>;

//# sourceMappingURL=index.d.ts.map

declare const index_d_Baobab: typeof Baobab;
declare const index_d_Drum: typeof Drum;
declare const index_d_Elephant: typeof Elephant;
declare const index_d_Example: typeof Example;
declare namespace index_d {
  export {
    index_d_Baobab as Baobab,
    index_d_Drum as Drum,
    index_d_Elephant as Elephant,
    index_d_Example as Example,
  };
}

export { Baobab, Drum, Elephant, Example, Icon, index_d as IconsFasaha };
export type { IconComponent, IconProps };
