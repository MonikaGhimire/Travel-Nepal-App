import * as React from 'react';
import { Card, Button } from "react-bootstrap";
import { ImageSlider } from "../../Components/ImageSlider/ImageSlider";
import StarRatingComponent from 'react-star-rating-component';
import { TextTruncate } from "../../Utility/TruncateText";
import Styles from "./SearchResult.module.scss";

export interface ISearchResultItemProps {
  images: any;
  redirectLink: string;
  title: string;
  description: string;
  rating: number;
}

export const SearchResultItem: React.FunctionComponent<ISearchResultItemProps> = (props: ISearchResultItemProps) => {  
  return (
    <Card className={Styles["card-container"]} style={{  }}>
      <ImageSlider images={props.images} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        {props.rating ? <StarRatingComponent
          name="rate1"
          editing={false}
          starCount={5}
          value={props.rating}
        /> : null}
        <Card.Text>
          {TextTruncate(props.description, 100)}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button type="button" variant="secondary" href={props.redirectLink}>View Details</Button>
      </Card.Footer>
    </Card>
  );
}
