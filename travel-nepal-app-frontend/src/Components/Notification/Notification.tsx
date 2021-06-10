import React from 'react';

export interface INotificationProps {
    show: boolean;
    errorMessage: string;
}

export const Notification = (props: INotificationProps): JSX.Element | null => {
    if (props.show) {
        return (
            <label style={{
                color: 'red',
                fontSize: '15px',
                marginLeft: '30px',
                marginBottom: '-25px',
                textAlign: 'center'
            }}>
                {props.errorMessage}
            </label>
        );
    }
    return null;
}
