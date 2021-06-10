import * as React from 'react';
import { Form, Button, Row, Col } from "react-bootstrap";
import Styles from "./Destination.module.scss";
import { UploadImages } from "./UploadImages";
import { DestinationAddQuery, IDestinationAddRequestParams } from "../../global-store/Queries/Destination";

export interface IAddDestinationProps {
    authToken: any;
    history: any;
}

export interface IAddDestinationState {
    destinationName: string;
    description: string;
    locationName: string;
    longitude: number | null;
    latitude: number | null;
    showImageUploadComponent: boolean;
    errors: {
        destinationNameError: string | null,
        descriptionError: string | null,
        locationNameError: string | null,
        longitudeError: string | null,
        latitudeError: string | null,
    };
    isFieldValid: boolean;
    destinationId: string;
}

export class AddDestination extends React.Component<IAddDestinationProps, IAddDestinationState> {
    constructor(props: IAddDestinationProps) {
        super(props);
        this.state = {
            destinationName: "",
            description: "",
            locationName: "",
            longitude: null,
            latitude: null,
            showImageUploadComponent: false,
            errors: {
                destinationNameError: null,
                descriptionError: null,
                locationNameError: null,
                longitudeError: null,
                latitudeError: null,
            },
            isFieldValid: false,
            destinationId: "",
        }
    }

    public render() {
        const headertext = this.state.showImageUploadComponent ? "Upload Images" : "Add destination";
        return (
            <div className={Styles["destination-add-container"]}>
                <h2 className={Styles.header}>{headertext}</h2>
                {this.handleRenderAddDestinationFormOrUploadImageComponent()}
            </div>
        );
    }

    private handleRenderAddDestinationFormOrUploadImageComponent = () => {
        return this.state.showImageUploadComponent ? (
            <UploadImages history={this.props.history} destinationId={this.state.destinationId} authToken={this.props.authToken} />
        ) : (
                <Form className={Styles["destination-add-form"]}>
                    <Form.Group as={Row} className={Styles["form-row"]}>
                        <Form.Label column sm="3">
                            Destination name:
                    </Form.Label>
                        <Col sm="9">
                            <Form.Control name="destinationName" value={this.state.destinationName} type="text" placeholder="Enter destination name" onChange={this.changeHandler} onFocus={this.handleCheckIfFieldValid} onBlur={this.handleCheckIfFieldValid} />
                            {this.state.errors.destinationNameError ? <Form.Label className={Styles.Errors}>{this.state.errors.destinationNameError}</Form.Label> : null}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className={Styles["form-row"]}>
                        <Form.Label column sm="3">
                            Description:
                    </Form.Label>
                        <Col sm="9">
                            <Form.Control as="textarea" rows={4} name="description" value={this.state.description} type="textarea" placeholder="Enter description" onChange={this.changeHandler} onFocus={this.handleCheckIfFieldValid} onBlur={this.handleCheckIfFieldValid} />
                            {this.state.errors.descriptionError ? <Form.Label className={Styles.Errors}>{this.state.errors.descriptionError}</Form.Label> : null}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className={Styles["form-row"]}>
                        <Form.Label column sm="3">
                            Locaition name:
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control name="locationName" value={this.state.locationName} type="text" placeholder="Enter location name" onChange={this.changeHandler} onFocus={this.handleCheckIfFieldValid} onBlur={this.handleCheckIfFieldValid} />
                            {this.state.errors.locationNameError ? <Form.Label className={Styles.Errors}>{this.state.errors.locationNameError}</Form.Label> : null}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className={Styles["form-row"]}>
                        <Form.Label column sm="3">
                            Longitude:
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control name="longitude" value={this.state.longitude ? this.state.longitude : ""} type="text" placeholder="Enter longitude" onChange={this.changeHandler} onFocus={this.handleCheckIfFieldValid} onBlur={this.handleCheckIfFieldValid} />
                            {this.state.errors.longitudeError ? <Form.Label className={Styles.Errors}>{this.state.errors.longitudeError}</Form.Label> : null}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className={Styles["form-row"]}>
                        <Form.Label column sm="3">
                            Latitude:
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control name="latitude" value={this.state.latitude ? this.state.latitude : ""} type="text" placeholder="Enter latitude" onChange={this.changeHandler} onFocus={this.handleCheckIfFieldValid} onBlur={this.handleCheckIfFieldValid} />
                            {this.state.errors.latitudeError ? <Form.Label className={Styles.Errors}>{this.state.errors.latitudeError}</Form.Label> : null}
                        </Col>
                    </Form.Group>

                    <Button disabled={this.isButtonDisabled()} variant="success" type="button" className={Styles["submit-button"]} onClick={this.hancleClickNext}>
                        Next
                    </Button>
                    <Button href={"/"} variant="secondary" type="button" className={Styles["cancel-button"]}>
                        Cancel
                    </Button>
                </Form>
            )
    }

    private isButtonDisabled = () => this.state.destinationName === "" || this.state.description === "" || this.state.locationName === "" || this.state.longitude === null || this.state.latitude === null || !this.state.isFieldValid ? true : false;

    private changeHandler = (e: any) => {
        const currentState: IAddDestinationState = { ...this.state };
        switch (e.currentTarget.name) {
            case "destinationName":
                currentState.destinationName = e.currentTarget.value;
                break;
            case "description":
                currentState.description = e.currentTarget.value;
                break;
            case "locationName":
                currentState.locationName = e.currentTarget.value;
                break;
            case "longitude":
                currentState.longitude = e.currentTarget.value;
                break;
            case "latitude":
                currentState.latitude = e.currentTarget.value;
                break;
        }

        this.setState(currentState);
    }

    private hancleClickNext = async () => {
        const params: IDestinationAddRequestParams = {
            name: this.state.destinationName,
            description: this.state.description,
            location: {
                longitude: this.state.longitude!,
                latitude: this.state.latitude!,
                name: this.state.locationName,
            }
        };
        const response = await DestinationAddQuery(params, this.props.authToken);
        this.setState({ destinationId: response.uuid, showImageUploadComponent: true });
    }

    private handleCheckIfFieldValid = (e: any) => {
        this.validateAField(e.target.name, e.target.value);
    }


    private validateAField = (field: any, value: any) => {
        let isFieldValid = true;
        switch (field) {
            case 'destinationName': {
                let errors = { ...this.state.errors }
                if (this.isValueEmpty(value)) {
                    errors.destinationNameError = 'Destination name is required!';
                    this.setState({ errors: errors, isFieldValid: false });
                    isFieldValid = false;
                }
                else {
                    errors.destinationNameError = null;
                    this.setState({
                        errors: errors,
                        isFieldValid: true,
                    });
                }
                break;
            }
            case 'description': {
                let errors = { ...this.state.errors };
                if (this.isValueEmpty(value)) {
                    errors.descriptionError = 'Description is required!';
                    this.setState({ errors, isFieldValid: false });
                    isFieldValid = false;
                } else {
                    errors.descriptionError = null;
                    this.setState({ errors: errors, isFieldValid: true });
                }
                break;
            }

            case 'locationName': {
                let errors = { ...this.state.errors };
                if (this.isValueEmpty(value)) {
                    errors.locationNameError = 'Location name is required!';
                    this.setState({ errors: errors, isFieldValid: false });
                    isFieldValid = false;
                }
                else {
                    errors.locationNameError = null;
                    this.setState({ errors: errors, isFieldValid: true });
                }
                break;
            }

            case 'longitude': {
                let errors = { ...this.state.errors };
                if (this.isValueEmpty(value)) {
                    errors.longitudeError = 'Longitude is required!';
                    this.setState({ errors: errors, isFieldValid: false });
                    isFieldValid = false;
                }
                else {
                    errors.longitudeError = null;
                    this.setState({ errors: errors, isFieldValid: true });
                }
                break;
            }

            case 'latitude': {
                let errors = { ...this.state.errors };
                if (this.isValueEmpty(value)) {
                    errors.latitudeError = 'Latitude is required!';
                    this.setState({ errors: errors, isFieldValid: false });
                    isFieldValid = false;
                }
                else {
                    errors.latitudeError = null;
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
