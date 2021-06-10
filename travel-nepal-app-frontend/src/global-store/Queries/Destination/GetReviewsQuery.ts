import axios from "axios";

export const GetReviewsQuery = async (id: string) => {
    const response = await axios.request({
        url: `https://kqfymcgiok.execute-api.eu-west-2.amazonaws.com/v1/api/destinations/reviews?destinationId=${id}`,
        method: "GET",
    });

    return response.data;
}
