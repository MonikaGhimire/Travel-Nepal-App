import * as React from 'react';
import Styles from "./ImageSlider.module.scss";
import { Carousel } from "react-bootstrap";

export interface IImageSliderProps {
    images: any[];
    customClassName?: string;
}

export const ImageSlider = (props: IImageSliderProps) => {
    const renderImages = () => {
        return props.images.map((image: any, index: number) => {
            return (
                <Carousel.Item key={`item-${index}`} className={`${Styles["image-slider-item"]} ${props.customClassName ? props.customClassName : ""}`}>
                    <img
                        className="d-block w-100"
                        src={image}
                        alt={`slide-no-${index}`}
                    />
                </Carousel.Item>
            )
        })
    }

    return (
        <Carousel className={Styles["image-slider-container"]}>
            {renderImages()}
        </Carousel>
    );
}
