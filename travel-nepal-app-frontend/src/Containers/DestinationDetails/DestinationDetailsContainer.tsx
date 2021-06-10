import * as React from 'react';
import { DestinationDetailsQuery } from "../../global-store/Queries/Destination/DestinationDetailsQuery";
import DestinationDetailsComponent from '../../Components/Destination/DestinationDetailsComponent';

export interface IDestinationDetailsContainerProps {
    match: any;
}

export interface IDestinationDetailsContainerState {
    destination: any;
    processing: boolean;
}

export class DestinationDetailsContainer extends React.Component<IDestinationDetailsContainerProps, IDestinationDetailsContainerState> {
    constructor(props: IDestinationDetailsContainerProps) {
        super(props);
        this.state = {
            destination: {},
            processing: false,
        }
    }

    public componentDidMount() {
        this.handleGetDestinationDetails();
    }

    // public componentDidUpdate() {
    //     this.handleGetDestinationDetails();
    // }

    public render(): JSX.Element {
        return (
            <DestinationDetailsComponent destination={this.state.destination} />
        );
    }

    private handleGetDestinationDetails = async () => {
        try {
            this.setState({ processing: true });
            const result = await DestinationDetailsQuery(this.props.match.params.id);
            this.setState({
                processing: false,
                destination: result
            });
        } catch (error) {
            this.setState({ processing: false })
        }
    }
}
