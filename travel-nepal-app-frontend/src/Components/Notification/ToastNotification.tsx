import * as React from 'react';
import { Toast } from "react-bootstrap";
import Styles from "./Notification.module.scss";

export interface IToastNotificationProps {
    message: string;
}

export const ToastNotification = (props: IToastNotificationProps) => {
    return (
        <Toast className={Styles["notification-container"]}>
            <Toast.Body>{props.message}</Toast.Body>
        </Toast>
    );
}