import * as React from 'react';
import { Form, Button, Row, Col } from "react-bootstrap";
import Styles from "./Feedback.module.scss";
import StarRatingComponent from 'react-star-rating-component';
import { AddReviewQuery, IAddReviewRequestParams } from "../../global-store/Queries/Destination/AddReviewsQuery";

export interface IUserFeedbackProps {
    userId: string;
    destinationId: string;
    token: any;
}

export interface IUserFeedbackState {
    title: string;
    rate: number;
    description: string;
    errors: {
        titleError: string | null,
        rateError: string | null,
    };
    isFieldValid: boolean;
    processing: boolean;
}

export class UserFeedback extends React.Component<IUserFeedbackProps, IUserFeedbackState> {
    constructor(props: IUserFeedbackProps) {
        super(props);
        this.state = {
            title: "",
            rate: 0,
            description: "",
            errors: {
                titleError: null,
                rateError: null,
            },
            isFieldValid: false,
            processing: false,
        }
    }
    render() {
        return (
            <Form className={Styles["destination-add-form"]}>
                <Form.Group as={Row} className={Styles["form-row"]}>
                    <Form.Label column sm="3">
                        Title:
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control name="title" value={this.state.title} type="text" placeholder="Enter title" onChange={this.changeHandler} onFocus={this.handleCheckIfFieldValid} onBlur={this.handleCheckIfFieldValid} />
                        {this.state.errors.titleError ? <Form.Label className={Styles.Errors}>{this.state.errors.titleError}</Form.Label> : null}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className={Styles["form-row"]}>
                    <Form.Label column sm="3">
                        Your rate:
                    </Form.Label>
                    <Col sm="9">
                        <span>
                            <StarRatingComponent
                                name="rate1"
                                starCount={5}
                                value={this.state.rate}
                                onStarClick={this.onStarClick}
                            />
                        </span>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className={Styles["form-row"]}>
                    <Form.Label column sm="3">
                        Your review:
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control as="textarea" rows={4} name="description" value={this.state.description} type="text" placeholder="Enter description" onChange={this.changeHandler} onFocus={this.handleCheckIfFieldValid} onBlur={this.handleCheckIfFieldValid} />
                    </Col>
                </Form.Group>

                <Button disabled={this.isButtonDisabled()} variant="success" type="button" className={Styles["submit-button"]} onClick={this.handleSubmit}>
                    Submit
                    </Button>
            </Form>
        );
    }

    private isButtonDisabled = (): boolean => this.state.title === "" || this.state.description === "" ? true : false;

    private handleSubmit = async () => {
        try {
            this.setState({ processing: true });
            const requestParams: IAddReviewRequestParams = {
                title: this.state.title,
                detail: this.state.description,
                rating: this.state.rate,
                destinationId: this.props.destinationId,
                userId: this.props.userId
            };
            await AddReviewQuery(requestParams, this.props.token);
            this.setState({ processing: false });
            window.location.reload();
        } catch (error) {
            this.setState({ processing: false });
        }
    }

    private onStarClick = (nextValue: number, prevValue: number, name: string) => {
        this.setState({ rate: nextValue });
    }

    private changeHandler = (e: any) => {
        const currentState: IUserFeedbackState = { ...this.state };
        switch (e.currentTarget.name) {
            case "title":
                currentState.title = e.currentTarget.value;
                break;
            case "rate":
                currentState.rate = e.currentTarget.value;
                break;
            case "description":
                currentState.description = e.currentTarget.value;
                break;
        }

        this.setState(currentState);
    }

    private handleCheckIfFieldValid = (e: any) => {
        this.validateAField(e.target.name, e.target.value);
    }

    private validateAField = (field: any, value: any) => {
        let isFieldValid = true;
        switch (field) {
            case 'title': {
                let errors = { ...this.state.errors };
                if (this.isValueEmpty(value)) {
                    errors.titleError = 'Title is required!';
                    this.setState({ errors, isFieldValid: false });
                    isFieldValid = false;
                } else {
                    errors.titleError = null;
                    this.setState({ errors: errors, isFieldValid: true });
                }
                break;
            }

            case 'rate': {
                let errors = { ...this.state.errors };
                if (this.isValueEmpty(value) || value === 0) {
                    errors.rateError = 'Rate is required!';
                    this.setState({ errors: errors, isFieldValid: false });
                    isFieldValid = false;
                }
                else {
                    errors.rateError = null;
                    this.setState({ errors: errors, isFieldValid: true });
                }
                break;
            }
        }

        return isFieldValid;
    }

    private isValueEmpty = (value: any) => {
        return !value;
    }
}
