import * as React from 'react';
import { Footer } from "../../Components/Footer/Footer";
import Styles from "./LandingPage.module.scss";
import { SearchPanelContainer } from "../SearchPanel/SearchPanelContainer";
import { SearchResultComponent } from "../SearchResult/SearchResultComponent";
import { DestinationSearchQuery } from "../../global-store/Queries/Destination/DestinationSearchQuery";

export interface ILandingPageProps {

}

export interface ILandingPageState {
    processing: boolean;
    destinationResults: any[];
    searchText: string;
}

export class LandingPage extends React.Component<ILandingPageProps, ILandingPageState> {
    constructor(props: ILandingPageProps) {
        super(props);
        this.state = {
            processing: false,
            destinationResults: [],
            searchText: "",
        }
    }

    public componentDidMount() {
        this.renderGetRestinationResults(this.state.searchText);
    }

    public componentDidUpdate(prevProps: ILandingPageProps, prevState: ILandingPageState) {
        if(this.state.searchText !== prevState.searchText) {
            this.renderGetRestinationResults(this.state.searchText);
        }
   }

    public render(): JSX.Element {
        return (
            <div>
                <div className={Styles["middle-section"]}>
                    <SearchPanelContainer getSearchText={this.handleGetSearchText} />
                    <SearchResultComponent destinations={this.state.destinationResults} />
                </div>
                <Footer />
            </div>
        );
    }

    private handleGetSearchText = (searchText: string) => {
        this.setState({ searchText });
    }

    private renderGetRestinationResults = async (searchText: string) => {
        try {
            this.setState({ processing: true });
            const result = await DestinationSearchQuery(searchText);
            this.setState({
                processing: false,
                destinationResults: result,
            });
        } catch (error) {
            this.setState({ processing: false });
        }
    }
}
