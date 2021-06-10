import * as React from 'react';
import * as actions from "../../global-store/ReduxSaga/Actions/index";
import Styles from "./PageHeader.module.scss";
import { LoginForm } from '../Login/LoginForm';
import { NavDropdown, Navbar, Nav } from "react-bootstrap";
import { connect } from 'react-redux';
import { TokenStorage } from "../../global-store/Queries";
import { UserInfo } from "../UserAccountInfo/UserInfo";
import logo from "../../logo.png";

export interface IPageHeaderProps {
    handleAuthenticateUser?: (user: any) => any;
    onClearErrorMessage?: () => any;
    handleRemoveAuthentication?: () => any;
    authenticated?: boolean;
    token?: string;
    error?: string;
    userInfo?: any;
    history: any;
}

export interface IPageHeaderState {
    showLoginForm: boolean;
}

class PageHeader extends React.Component<IPageHeaderProps, IPageHeaderState> {
    constructor(props: IPageHeaderProps) {
        super(props);
        this.state = {
            showLoginForm: false,
        }
    }

    public render(): JSX.Element {
        return (
            <div className={Styles["header-container"]}>
                <div className={Styles["header-block"]}>
                    <div className={Styles["logo-container"]}>
                        <img src={logo} alt="logo" />
                    </div>
                    {this.leftSection()}
                </div>
                {this.getLoginForm()}
            </div>
        );
    }

    private getLoginForm = () => {
        if (this.props.authenticated) {
            return null;
        }

        return this.state.showLoginForm ? (
            <div className={Styles["login-container"]}>
                <LoginForm
                    onClose={this.handleCloseLoginForm}
                    onClick={this.props.handleAuthenticateUser!}
                    token={this.props.token!}
                    authenticated={this.props.authenticated!}
                    errorMessage={this.props.error!}
                />
            </div>
        ) : null
    }

    private handleShowLoginForm = () => {
        this.setState({ showLoginForm: true });
    }

    private handleCloseLoginForm = () => {
        if (this.props.onClearErrorMessage) {
            this.props.onClearErrorMessage();
        }
        this.setState({ showLoginForm: false });
    }

    private getSignInOrSignOutOption = () => {
        return this.props.userInfo ? (
            <UserInfo history={this.props.history} userInfo={this.props.userInfo} onSignOutClick={this.hangleSignOutClick} />
        ) : (
            <Navbar>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown className={Styles["dropdown-holder"]} title={"Options"} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={this.handleShowLoginForm}>Sign In</NavDropdown.Item>
                            <NavDropdown.Item href="/">Go to home</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }

    private leftSection = (): JSX.Element => {
        return (
            <div className={Styles["left-section-container"]}>
                {this.getSignInOrSignOutOption()}
            </div>
        )
    }

    private hangleSignOutClick = () => {
        if (this.props.handleRemoveAuthentication) {
            this.props.handleRemoveAuthentication();
        }
        TokenStorage.clearToken();
        this.setState({ showLoginForm: false });
    }
}

const mapStateToProps = (state: any) => {
    return {
        userInfo: state.userInfo,
        token: state.token,
        authenticated: state.authenticated,
        loading: state.loading,
        error: state.error,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        handleAuthenticateUser: (user: any) => dispatch(actions.authenticateUsers(user)),
        onClearErrorMessage: () => dispatch(actions.clearErrorMessage()),
        handleRemoveAuthentication: () => dispatch(actions.clearAuthentication()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageHeader)
