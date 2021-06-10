import * as React from 'react';
import { Card, Button } from "react-bootstrap";
import { ImageSlider } from "../ImageSlider/ImageSlider";

export interface IDestinationItemProp {
  images: any;
  redirectLink: string;
}

export const DestinationItem: React.FunctionComponent<IDestinationItemProp> = (props: IDestinationItemProp) => {
  return (
    <Card style={{ width: '18rem' }}>
      <ImageSlider images={props.images} />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the bulk of
          the card's content.
        </Card.Text>
        <Button type="button" variant="secondary" href={props.redirectLink}>View Details</Button>
      </Card.Body>
    </Card>
  );
}
