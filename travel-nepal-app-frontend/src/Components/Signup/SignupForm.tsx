import * as React from "react";
import { Form, Button } from "react-bootstrap";
import Styles from "./SignupForm.module.scss";

export interface ISignUpProps {
    onClose: () => void;
    onSubmit: (params: any) => any;
}

export interface ISignUpState {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    errors: {
        firstNameError: string | null,
        lastNameError: string | null,
        emailError: string | null,
        passwordError: string | null,
    };
    isFieldValid: boolean;
}

export class SignUp extends React.Component<ISignUpProps, ISignUpState> {
    constructor(props: ISignUpProps) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            errors: {
                firstNameError: null,
                lastNameError: null,
                emailError: null,
                passwordError: null
            },
            isFieldValid: false,
        }
    }
    render(): JSX.Element {
        return (
            <>
                <div className={Styles.container}>
                    <div className={Styles["container-canvas"]}>
                        <button className={Styles["close-button"]} onClick={this.props.onClose}>X</button>
                        <div className={Styles["container-header"]}>
                            <h1>Sign Up</h1>
                        </div>
                        <Form className={Styles["signup-form"]}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control name="firstName" value={this.state.firstName} type="text" placeholder="First Name:" onChange={this.changeHandler} onFocus={this.handleCheckIfFieldValid} onBlur={this.handleCheckIfFieldValid} />
                                {this.state.errors.firstNameError ? <Form.Label className={Styles.Errors}>{this.state.errors.firstNameError}</Form.Label> : null}
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control name="lastName" value={this.state.lastName} type="text" placeholder="Last Name:" onChange={this.changeHandler} onFocus={this.handleCheckIfFieldValid}  onBlur={this.handleCheckIfFieldValid} />
                                {this.state.errors.lastNameError ? <Form.Label className={Styles.Errors}>{this.state.errors.lastNameError}</Form.Label> : null}
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control name="email" value={this.state.email} type="email" placeholder="Email Address:" onChange={this.changeHandler} onFocus={this.handleCheckIfFieldValid} onBlur={this.handleCheckIfFieldValid} />
                                {this.state.errors.emailError ? <Form.Label className={Styles.Errors}>{this.state.errors.emailError}</Form.Label> : null}
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control name="password" value={this.state.password} type="password" placeholder="Password:" onChange={this.changeHandler} onFocus={this.handleCheckIfFieldValid}  onBlur={this.handleCheckIfFieldValid} />
                                {this.state.errors.passwordError ? <Form.Label className={Styles.Errors}>{this.state.errors.passwordError}</Form.Label> : null}
                            </Form.Group>
                            <Button disabled={this.isButtonDisabled()} variant="success" type="button" className={Styles["submit-button"]} onClick={this.handleClickSignUp} >
                                Sign Up
                            </Button>
                        </Form>
                    </div>
                </div>
            </>
        )
    }

    private isButtonDisabled = (): boolean => this.state.firstName === "" || this.state.lastName === "" || this.state.email === "" || this.state.password === "" || !this.state.isFieldValid ? true : false;

    private handleClickSignUp = async () => {
        const signupParams = {
            username: `${this.state.firstName} ${this.state.lastName}`,
            email: this.state.email,
            password: this.state.password,
        }
        await this.props.onSubmit(signupParams);
    }

    private handleCheckIfFieldValid = (e: any) => {
        this.validateAField(e.target.name, e.target.value);
    }

    private changeHandler = (e: any) => {
        const currentState: ISignUpState = { ...this.state };
        switch (e.currentTarget.name) {
            case "firstName":
                currentState.firstName = e.currentTarget.value;
                break;
            case "lastName":
                currentState.lastName = e.currentTarget.value;
                break;
            case "email":
                currentState.email = e.currentTarget.value;
                break;
            case "password":
                currentState.password = e.currentTarget.value;
                break;
        }

        this.setState(currentState);
    }

    private validateAField = (field: any, value: any) => {
        let isFieldValid = true;
        switch (field) {
            case 'firstName': {
                let errors = { ...this.state.errors }
                if (this.isValueEmpty(value)) {
                    errors.firstNameError = 'First name is required!';
                    this.setState({ errors: errors, isFieldValid: false });
                    isFieldValid = false;
                }
                else {
                    errors.firstNameError = null;
                    this.setState({
                        errors: errors,
                        isFieldValid: true,
                    });
                }
                break;
            }
            case 'lastName': {
                let errors = { ...this.state.errors };
                if (this.isValueEmpty(value)) {
                    errors.lastNameError = 'Last name is required!';
                    this.setState({ errors, isFieldValid: false });
                    isFieldValid = false;
                } else {
                    errors.lastNameError = null;
                    this.setState({ errors: errors, isFieldValid: true });
                }
                break;
            }

            case 'email': {
                let errors = { ...this.state.errors };
                if (this.isValueEmpty(value)) {
                    errors.emailError = 'Email is required!';
                    this.setState({ errors: errors, isFieldValid: false });
                    isFieldValid = false;
                } else if (!this.emailIsValid(value)) {
                    errors.emailError = 'Invalid email address!';
                    this.setState({ errors: errors, isFieldValid: false });
                }
                else {
                    errors.emailError = null;
                    this.setState({ errors: errors, isFieldValid: true });
                }
                break;
            }

            case 'password': {
                let errors = { ...this.state.errors };
                if (this.isValueEmpty(value)) {
                    errors.passwordError = 'Password is required!';
                    this.setState({ errors: errors, isFieldValid: false });
                    isFieldValid = false;
                }
                else {
                    errors.passwordError = null;
                    this.setState({ errors: errors , isFieldValid: true});
                }
                break;
            }
        }

        return isFieldValid;
    }

    isValueEmpty = (value: any) => {
        return !value;
    }

    emailIsValid(email: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }
}
