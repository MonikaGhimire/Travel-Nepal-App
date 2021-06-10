import axios from "axios";

export interface IDestinationAddRequestParams {
    name: string;
    description: string;
    location: {
        longitude: number,
        latitude: number,
        name: string,
    };
    imageUrls?: any[];
    recommended?: boolean;
    featured?: boolean;
}

export const DestinationAddQuery = async (param: IDestinationAddRequestParams, token: any) => {
    const response = await axios.request({
        url: "https://kqfymcgiok.execute-api.eu-west-2.amazonaws.com/v1/api/destinations",
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        data: param
    });

    return response.data;
}
