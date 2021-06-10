import axios from "axios";

export const DestinationSearchQuery = async (searchtext?: String) => {
    const queryString = searchtext ? `q=${searchtext}` : "";
    const response = await axios.request({
        url: `https://kqfymcgiok.execute-api.eu-west-2.amazonaws.com/v1/api/destinations/search?${queryString}`,
        method: "GET"
    });

    return response.data;
}
