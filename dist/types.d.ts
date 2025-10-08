export interface IconProps {
    size?: number | string;
    color?: string;
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}
export interface IconComponent extends React.FC<IconProps> {
    displayName?: string;
}
//# sourceMappingURL=types.d.ts.map