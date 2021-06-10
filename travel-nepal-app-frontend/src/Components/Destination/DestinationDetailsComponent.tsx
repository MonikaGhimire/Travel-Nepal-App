import * as React from 'react';
import Styles from "./DestinationDetails.module.scss";
import { connect } from 'react-redux';
import { ImageSlider } from "../ImageSlider/ImageSlider";
import StarRatingComponent from 'react-star-rating-component';
import { RatingsComponent } from "../../Containers/DestinationDetails/Ratings";
import { UserFeedback } from "../Feedback/UserFeedback";
import { GetReviewsQuery } from "../../global-store/Queries/Destination/GetReviewsQuery";

export interface IDestinationDetailsComponentProps {
    destination: any;
    authenticated?: boolean;
    token?: string;
    userInfo?: any;
}

export interface IDestinationDetailsComponentState {
    ratings: any;
    processing: boolean;
}

class DestinationDetailsComponent extends React.Component<IDestinationDetailsComponentProps, IDestinationDetailsComponentState> {
    constructor(props: IDestinationDetailsComponentProps) {
        super(props);
        this.state = {
            ratings: [],
            processing: false,
        }
    }

    public componentDidMount() {
        this.handleGetReviews();
    }

    public componentDidUpdate(prevProps: IDestinationDetailsComponentProps) {
        if (prevProps.destination.uuid !== this.props.destination.uuid) {
            this.handleGetReviews();
        }
    }

    render() {
        return (
            <div className={Styles.container}>
                <h2 className={Styles["container-header"]}>{this.props.destination.name}</h2>
                <div className={Styles["container-top-section"]}>
                    <div className={Styles["image-slider-container"]}>
                        {this.props.destination.imageUrls ? <ImageSlider customClassName={Styles["slider-container"]} images={this.props.destination.imageUrls.urls} /> : null}
                    </div>
                    <div className={Styles["details-section"]}>
                        <p className={Styles["destination-details"]}>
                            {this.props.destination.description}
                        </p>
                        {this.props.destination.averageRating ? <div className={Styles["average-rating-container"]}>
                            <p>Average rating:</p>
                            <StarRatingComponent
                                name="rate1"
                                editing={false}
                                starCount={5}
                                value={this.props.destination.averageRating}
                            />
                        </div> : null}
                    </div>
                </div>
                {this.state.ratings && this.state.ratings.length > 0 ? <RatingsComponent ratings={this.state.ratings} /> : <></>}
                {this.handleRenderAddReviewComponent()}
            </div>
        );
    }

    private handleRenderAddReviewComponent = () => {
        if (this.props.authenticated) {
            return (
                <div className={Styles["container-bottom-section"]}>
                    <h2 className={Styles["rating-header"]}>Write your review</h2>
                    <div className={Styles["feedback-container"]}>
                        <UserFeedback token={this.props.token} destinationId={this.props.destination.uuid} userId={this.props.userInfo.id} />
                    </div>
                </div>
            )
        }
    }

    private handleGetReviews = async () => {
        try {
            this.setState({ processing: true });
            const result = await GetReviewsQuery(this.props.destination.uuid);
            this.setState({
                ratings: result,
                processing: false,
            });
        } catch (error) {
            this.setState({ processing: false });
        }
    }
}

const mapStateToProps = (state: any) => {
    return {
        userInfo: state.userInfo,
        token: state.token,
        authenticated: state.authenticated,
    }
}

export default connect(mapStateToProps)(DestinationDetailsComponent)
