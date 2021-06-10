import * as React from "react";
import { Notification } from "../Notification/Notification";
import Styles from "./LoginForm.module.scss";
import { Form, Button } from "react-bootstrap";
import { signupQuery } from "../../global-store/Queries"
import { ToastNotification } from "../Notification/ToastNotification";
import { SignUp } from "../Signup/SignupForm";

interface ILoginFormProps {
    onClose?: () => void;
    onClick: (user: any) => any
    token: string;
    authenticated: boolean;
    errorMessage: string;
}

export interface ILoginFormState {
    username: string;
    password: string;
    showErrorMessage: boolean;
    showSignUpPage: boolean;
    showToastNotification: boolean;
    notificationMessage: string;
}

export class LoginForm extends React.Component<ILoginFormProps, ILoginFormState> {
    constructor(props: ILoginFormProps) {
        super(props);
        this.state = {
            showErrorMessage: false,
            username: "",
            password: "",
            showSignUpPage: false,
            showToastNotification: false,
            notificationMessage: "",
        };
    }

    public render(): JSX.Element {
        const exceptionMessages = <Notification show={this.props.errorMessage !== ""} errorMessage="Invalid UserName or Password" />;
        return (
            <div className={Styles.container}>
                <div className={Styles["container-canvas"]}>
                    <button className={Styles["close-button"]} onClick={this.props.onClose}>X</button>
                    <div className={Styles["container-header"]}>
                        <h1>Login</h1>
                    </div>
                    {exceptionMessages}
                    <Form className={Styles["login-form"]}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="username" value={this.state.username} type="email" placeholder="Enter email" onChange={this.changeHandler} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={this.state.password} name="password" onChange={this.changeHandler} type="password" placeholder="Password" />
                        </Form.Group>
                        <Button disabled={this.isButtonDisabled()} variant="success" type="button" className={Styles["submit-button"]} onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                    <Button variant="primary" type="button" className={Styles["submit-button"]} onClick={this.handleCreateNewAccountClick}>
                        Create a new account
                    </Button>
                </div>
                {this.state.showSignUpPage ? <div className={Styles["signup-container"]}><SignUp onClose={this.handleCloseSignUpForm} onSubmit={this.handleSignup} /></div> : null}
                {this.state.showToastNotification ? <ToastNotification message={this.state.notificationMessage} /> : null}
            </div>
        );
    }

    private isButtonDisabled = (): boolean => this.state.username === "" || this.state.password === "" ? true : false;

    private changeHandler = (e: any) => {
        const currentState: ILoginFormState = { ...this.state };
        switch (e.currentTarget.name) {
            case "username":
                currentState.username = e.currentTarget.value;
                break;
            case "password":
                currentState.password = e.currentTarget.value;
                break;
        }

        this.setState(currentState);
    }

    private handleSubmit = () => {
        this.props.onClick({
            username: this.state.username,
            password: this.state.password
        });
    }

    private handleCreateNewAccountClick = () => {
        this.setState({ showSignUpPage: true });
    }

    private handleCloseSignUpForm = () => {
        this.setState({ showSignUpPage: false });
    }

    private handleSignup = async (params: any) => {
        try {
            await signupQuery(params);
            await this.setState({
                showToastNotification: true,
                notificationMessage: "Signup successful!",
                showSignUpPage: false,
            });
        } catch (error) {
            this.setState({
                showToastNotification: true,
                notificationMessage: "Signup failed! Please try again.",
                showSignUpPage: true,
            });
        }
    }
}
