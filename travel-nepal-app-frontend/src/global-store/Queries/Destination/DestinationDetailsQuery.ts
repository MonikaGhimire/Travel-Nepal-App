import axios from "axios";

export const DestinationDetailsQuery = async (id: string) => {
    const response = await axios.request({
        url: `https://kqfymcgiok.execute-api.eu-west-2.amazonaws.com/v1/api/destinations/${id}`,
        method: "GET",
    });

    return response.data;
}
