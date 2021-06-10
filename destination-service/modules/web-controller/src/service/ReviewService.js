import { getUuid } from '../util/util';
import { insert, fetchReviewsForADestination } from '../dao/ReviewDao';

export const addReview = async (review) => {
    review.uuid = getUuid();
    await insert(review);
};

export const getReviewsForADestination = async (destinationId) => {
    const reviews = await fetchReviewsForADestination(destinationId);

    if (!reviews.rows) {
        return [];
    }

    return reviews.rows.map(review => {
        review.destinationId = review.destination_id;
        review.userId = review.user_id;
        review.userFullName = review.user_full_name;

        delete review.destination_id;
        delete review.user_id;
        delete review.user_full_name;

        return review;
    });
};
