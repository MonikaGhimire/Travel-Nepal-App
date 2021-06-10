import axios from "axios";

export const uploadImagesQuery = async (param: any, token: any) => {
    const response = await axios.request({
        url: "https://kqfymcgiok.execute-api.eu-west-2.amazonaws.com/v1/api/images",
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        data: param
    });

    return response.data;
}
