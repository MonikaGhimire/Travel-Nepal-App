import * as React from 'react';
import Styles from "./SearchPanelContainer.module.scss";
import { InputGroup, FormControl } from "react-bootstrap";

export interface ISearchPanelContainerProps {
    getSearchText: (searchText: string) => void;
}

export interface ISearchPanelContainerState {
    searchText: string;
}

export class SearchPanelContainer extends React.Component<ISearchPanelContainerProps, ISearchPanelContainerState> {
    constructor(props: ISearchPanelContainerProps) {
        super(props);
        this.state = {
            searchText: "",
        }
    }

    render() {
        return (
            <div className={Styles.container}>
                <h2 className={Styles["search-panel-header"]}>Find your destination</h2>
                <InputGroup className={Styles["search-panel-input"]} size="lg">
                    <FormControl name="searchText" type="text" aria-label="Large" value={this.state.searchText} onChange={this.changeHandler} onKeyUp={this.handleSearchText} placeholder="Search your destination" aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>
            </div>
        );
    }

    private handleSearchText = (e: any) => {
        if (e.key === "Enter" || e.charCode === 13) {
            this.props.getSearchText(this.state.searchText);
        }
    }

    private changeHandler = (e: any) => {
        const currentState: ISearchPanelContainerState = { ...this.state };
        switch (e.currentTarget.name) {
            case "searchText":
                currentState.searchText = e.currentTarget.value;
                break;
        }
        this.setState(currentState);
    }
}
