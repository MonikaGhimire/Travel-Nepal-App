import * as React from 'react';
import Styles from "./DestinationDetails.module.scss";
import StarRatingComponent from 'react-star-rating-component';

export interface IRatingsComponentProps {
    ratings: any;
}

export interface IRatingsComponentState {

}

export class RatingsComponent extends React.Component<IRatingsComponentProps, IRatingsComponentState> {
    render() {
        return (
            <div className={`${Styles.container} ${Styles["container-middle-section"]}`}>
                <h2 className={Styles["rating-header"]}>Ratings</h2>
                {this.handleRenderRatings()}
            </div >
        );
    }

    private handleRenderRatings = () => {
        return this.props.ratings.map((rating: any) => (
            <div className={Styles["container-ratings"]}>
                <span className={Styles["user-details"]}>{rating.userFullName}</span>
                <div className={Styles["rating-details"]}>
                    <div className={Styles["rating-details-header"]}>
                        <span>{rating.title}</span>
                        <StarRatingComponent
                            name="rate1"
                            editing={false}
                            starCount={5}
                            value={rating.rating}
                        />
                    </div>
                    <p className={Styles["rating-details-description"]}>{rating.detail}</p>
                </div>
            </div>
        ))
    }
}
