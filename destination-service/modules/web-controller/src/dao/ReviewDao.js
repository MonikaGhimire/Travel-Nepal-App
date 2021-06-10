import { Pool, Client } from 'pg';

export const insert = async (review) => {
    const client = new Client()
    await client.connect()

    const query = {
        text: 'INSERT INTO review(uuid, title, detail, rating, user_full_name, user_id, destination_id) VALUES($1, $2, $3, $4, $5, $6, $7)',
        values: [review.uuid, review.title, review.detail, review.rating, review.userFullName, review.userId, review.destinationId]
    }

    try {
        await client.query(query);
    } catch (error) {
        throw error;
    } finally {
        client.end();
    }
};

export const fetchReviewsForADestination = async (destinationId) => {
    const client = new Client()
    await client.connect()

    const query = {
        text: 'SELECT * FROM review where destination_id = $1',
        values: [destinationId],
    }

    try {
        return await client.query(query);
    } catch (error) {
        throw error;
    } finally {
        client.end();
    }
};

export const getAverageRatingsForDestinations = async (destinationIds) => {
    const client = new Client()
    await client.connect()

    const idsJoin = destinationIds.map(item => "'" + item + "'").join(',');

    const query = {
        text: "select destination_id, AVG(rating) from review where destination_id in (" +idsJoin+ ") group by destination_id;",
        values: [],
    }

    try {
        return await client.query(query);
    } catch (error) {
        throw error;
    } finally {
        client.end();
    }
};