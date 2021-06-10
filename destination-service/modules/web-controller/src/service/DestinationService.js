import { getUuid } from '../util/util';
import { insert, fetch, updateImageUrls, performDelete, getAllDestinations } from '../dao/DestinationDao';
import { getAverageRatingsForDestinations } from '../dao/ReviewDao'

export const addDestination = async (destination) => {
    destination.uuid = getUuid();
    await insert(destination);
};

export const getDestination = async (destinationId) => {
    const resultSet = await fetch(destinationId);
    if (resultSet.rows.length === 0) {
        return {};
    }

    const destination = resultSet.rows[0];
    destination.imageUrls = destination.image_urls;
    delete destination.image_urls;

    const ratingResultSet = await getAverageRatingsForDestinations([destinationId]);
    if (ratingResultSet.rows.length > 0) {
        destination.averageRating = Number(ratingResultSet.rows[0].avg).toFixed(2);
    }

    return destination;
};

export const deleteDestination = async (destinationId) => {
    await performDelete(destinationId);
};

export const patchImageUrls = async (destination) => {
    await updateImageUrls(destination);
};

export const searchDestinations = async (query) => {
    let allDestinations = await getAllDestinations();
    allDestinations = allDestinations.rows;

    if (query && allDestinations.length > 0) {
        allDestinations = filterDestinations(allDestinations, query);
    }

    const destinations = allDestinations.map(item => {
        const imageUrls = item.image_urls;
        delete item.image_urls;
        item.imageUrls = imageUrls.urls;
        return item;
    });

    const mergedDestinations = await mergeAverageRatingWithDestinations(destinations);
    return mergedDestinations;
};

const mergeAverageRatingWithDestinations = async (destinations) => {
    const destinationIds = destinations.map(item => item.uuid);

    const resultSet = await getAverageRatingsForDestinations(destinationIds);
    const ratings = resultSet.rows;

    return destinations.map(item => {
        const foundRatings = ratings.filter(ratingItem => ratingItem.destination_id === item.uuid);
        if (foundRatings.length > 0) {
            item.averageRating = Number(foundRatings[0].avg).toFixed(2);
        }

        return item;
    });
}

const filterDestinations = (destinations, query) => {
    return destinations.filter(destination => containsKeyword(destination, query));
}

const containsKeyword = (destination, query) => {
    let str = destination.name + " ";
    str += destination.description  + " ";

    if (destination.location) {
        str += destination.location.name  + " ";
    }

    str = str.toLowerCase();
    query = query.toLowerCase();

    const keywords = query.split(/\s+/);
    let includes = false;

    console.log(JSON.stringify(keywords));

    keywords.forEach(keyword => {
        if (keyword.trim() !== '' && str.includes(keyword)) {
            includes = true;
        }
    });

    return includes;
};