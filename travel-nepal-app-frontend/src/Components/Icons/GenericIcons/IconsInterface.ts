

export interface IIconProps {
    path1Color?: string;
    path2Color?: string;
    backgroundColour?: string;
    size?: IIconSize;
    borderColor?: string;
    customClasses?: string;
    disabled?: boolean;
    symbol: IIconType;
}

export enum IIconSize {
    XSmall = "xsmall",
    Small = "small",
    Medium = "medium",
    Large = "large",
    XLarge = "xlarge",
}

export enum IIconType {
    SearchIcon = "SearchIcon",
    arrowLeftIcon = "arrowLeftIcon",
    arrowRightIcon = "arrowRightIcon",
}
