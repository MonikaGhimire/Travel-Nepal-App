import * as React from "react";
import Styles from "./Icons.module.scss";
import { IIconProps, IIconSize } from "./IconsInterface";
import { IconsList } from "./IconsList";

export function GenericIcon(props: IIconProps): JSX.Element {
    const getClasses = () => {
        const classes = [Styles.icon];

        if (props.disabled) {
            classes.push(Styles["icon-disabled"]);
        }

        if (props.path2Color) {
            classes.push(Styles["path2-color-" + props.path2Color]);
        }

        if (props.path1Color) {
            classes.push(Styles["path1-color-" + props.path1Color]);
        }

        if (props.size) {
            classes.push(Styles["size-" + props.size]);
        }

        if (props.borderColor) {
            classes.push(Styles["icon-border-" + props.borderColor]);
        }

        if (props.customClasses) {
            classes.push(props.customClasses);
        }

        return classes.join(" ").trim();
    };

    const getPaths = () => IconsList[props.symbol] ? IconsList[props.symbol].paths.map((path: string, index: number) => {
        const iconClass = index === 0 ? Styles.base : Styles.icon;
        return <path key={`ico-path-${index}`} className={`${iconClass}`} d={path} />;
    }) : null;

    return (
        <svg className={getClasses()} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
            <g fill="none" fillRule="evenodd">
                {getPaths()}
            </g>
        </svg>
    );
}

GenericIcon.defaultProps = {
    size: IIconSize.Medium,
    iconColor: "chambray",
    backgroundColour: "transparent",
};
