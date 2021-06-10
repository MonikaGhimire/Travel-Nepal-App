import * as React from 'react';
import Styles from "./Footer.module.scss";

export interface IFooterProps {

}

export interface IFooterState {
    showDoalog: boolean;
    dialogMessage: string;
}

export class Footer extends React.Component<IFooterProps, IFooterState> {
    state: IFooterState = {
        showDoalog: false,
        dialogMessage: "Every effort has been made to ensure accuracy and reliability of the content. \
        In case of lapses and discrepancies, revisions and updates will be made. \
        Therefore, we request you to approach us via e-mail, social media, phone \
        or in person, for suggestions on revisions and updates where necessary. Thank you for support!"
    }
    render() {
        return (
            <div className={Styles["footer-container"]}>
                <div className={Styles["top-section"]}>
                    <span>About us</span>
                    <span>Contact us</span>
                    <span onClick={this.onDisclaimerClick}>Disclaimer</span>
                </div>
                <div className={Styles["bottom-section"]}>
                    <span className={Styles["copyright-container"]}>
                        <em>&copy; TravelNepal. All right reserved.</em>
                        <span>
                            <a href="/">Terms of Use </a>
                            |
                        <a href="/"> Privace and Cookies Statement </a>
                            |
                        <a href="/"> How the site works</a>
                        </span>
                        <em>Designed by:  Monika Ghimire</em>
                    </span>
                </div>
                {this.state.showDoalog ? this.getDisclaimerDialogBox() : null}
            </div>
        );
    }

    private onDisclaimerClick = () => {
        this.setState({ showDoalog: true });
    }

    private closeDialogBox = () => {
        this.setState({ showDoalog: false });
    }

    private getDisclaimerDialogBox = () => {
        return (
            <div className={Styles["overlay-container"]}>
                <div className={Styles["overlay-container-canvas"]}>
                    <div className={Styles["dialog-content"]}>
                        <button className={Styles["close-button"]} onClick={this.closeDialogBox}>X</button>
                        <span>{this.state.dialogMessage}</span>
                    </div>
                </div>
            </div>
        )
    }
}
