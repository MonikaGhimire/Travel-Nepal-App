import * as React from 'react';
import Styles from './Spinner.scss';

export interface ISpinnerProps {
    loading: boolean;
}

export const Spinner = (props: ISpinnerProps): JSX.Element | null => {
    if (props.loading) {
        return <img className={Styles.Loader} src="loading.gif" alt="Loading..." />
    }

    return null;
}
