import { Pool, Client } from 'pg';

export const insert = async (destination) => {
    const client = new Client()
    await client.connect()

    if (destination.recommended) {
        destination.recommended = true;
    } else {
        destination.recommended = false;
    }

    if (destination.featured) {
        destination.featured = true;
    } else {
        destination.featured = false;
    }

    if (!destination.imageUrls) {
        destination.imageUrls = {urls: []};
    } else {
        destination.imageUrls = {urls: destination.imageUrls}
    }

    const query = {
        text: 'INSERT INTO destination(uuid, name, description, location, image_urls, recommended, featured) VALUES($1, $2, $3, $4, $5, $6, $7)',
        values: [destination.uuid, destination.name, destination.description, destination.location, destination.imageUrls, destination.recommended, destination.featured],
    }

    try {
        await client.query(query);
    } catch (error) {
        throw error;
    } finally {
        client.end();
    }
};

export const fetch = async (destinationId) => {
    const client = new Client()
    await client.connect()

    const query = {
        text: 'SELECT * FROM destination WHERE uuid = $1',
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

export const updateImageUrls = async (destination) => {
    const client = new Client()
    await client.connect()

    const query = {
        text: 'UPDATE destination set image_urls = $1 WHERE uuid = $2',
        values: [{urls: destination.imageUrls}, destination.uuid],
    }

    try {
        await client.query(query);
    } catch (error) {
        throw error;
    } finally {
        client.end();
    }
};

export const performDelete = async (destinationId) => {
    const client = new Client()
    await client.connect()

    const query = {
        text: 'DELETE FROM destination WHERE uuid = $1',
        values: [destinationId],
    }

    try {
        await client.query(query);
    } catch (error) {
        throw error;
    } finally {
        client.end();
    }
};

export const getAllDestinations = async () => {
    const client = new Client()
    await client.connect()

    const query = {
        text: 'SELECT * FROM destination',
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