import * as React from 'react';
import { SearchResultItem } from "./SearchResultItem";
import Styles from "./SearchResult.module.scss";

export interface ISearchResultComponentProps {
    destinations: any;
}

export class SearchResultComponent extends React.Component<ISearchResultComponentProps> {
    render() {
        return (
            <div className={Styles.container}>
                {this.handleRenderResultItems()}
            </div>
        );
    }

    private handleRenderResultItems = (): JSX.Element => {
        return this.props.destinations && this.props.destinations.length > 0 ? (
            this.props.destinations.map((destination: any) => {
                return <SearchResultItem
                    key={`item-${destination.uuid}`}
                    images={destination.imageUrls}
                    title={destination.name}
                    description={destination.description}
                    rating={destination.averageRating}
                    redirectLink={`/destination-details/${destination.uuid}`}
                />
            })
        ) : <></>;
    }
}
