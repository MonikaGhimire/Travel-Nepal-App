import * as React from 'react';
import { Modal, Button } from "react-bootstrap";

export interface IConfirmationNotificationProps {
    notificationMessage: string;
}

export interface IConfirmationNotificationState {

}

export class ConfirmationNotification extends React.Component<IConfirmationNotificationProps, IConfirmationNotificationState> {
    render() {
        return (
            <>
                <Modal>
                    <Modal.Header closeButton>
                        <Modal.Title>Success!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.props.notificationMessage}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" href={"/"}>
                            Okay
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

