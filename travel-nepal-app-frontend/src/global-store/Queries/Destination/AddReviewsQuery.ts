import axios from "axios";

export interface IAddReviewRequestParams {
    title: string;
    detail: string;
    rating: number;
    destinationId: string;
    userId: string;
}

export const AddReviewQuery = async (param: IAddReviewRequestParams, token: any) => {
    const response = await axios.request({
        url: `https://kqfymcgiok.execute-api.eu-west-2.amazonaws.com/v1/api/destinations/reviews`,
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        data: param
    });

    return response.data;
}
