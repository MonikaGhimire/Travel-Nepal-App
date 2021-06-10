import axios from "axios";

export interface IDestinationAddPatchRequestParams {
    imageUrls: any;
    uuid: string;
}

export const DestinationAddPatchQuery = async (param: IDestinationAddPatchRequestParams, token: any) => {
    const response = await axios.request({
        url: `https://kqfymcgiok.execute-api.eu-west-2.amazonaws.com/v1/api/destinations/${param.uuid}`,
        method: "PATCH",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        data: param
    });

    return response.data;
}
