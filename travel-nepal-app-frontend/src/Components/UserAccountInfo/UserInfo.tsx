import * as React from 'react';
import { NavDropdown, Navbar, Nav } from "react-bootstrap";
import Styles from "./UserInfo.module.scss";

export interface IUserInfoProps {
    userInfo: any;
    onSignOutClick: () => void;
    history: any;
}

export const UserInfo: React.FunctionComponent<IUserInfoProps> = (props: IUserInfoProps) => {
    const handleSignOutClick = () => {
        props.onSignOutClick();
    };

    return (
        <Navbar className={Styles.container}>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown className={Styles["dropdown-holder"]} title={props.userInfo!.name} id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={handleSignOutClick}>Sign Out</NavDropdown.Item>
                        <NavDropdown.Item href="/">Go to home</NavDropdown.Item>
                        {props.userInfo.role === "ADMIN" ? <NavDropdown.Item href="/destination-add">Add destination</NavDropdown.Item> : <></>}
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
