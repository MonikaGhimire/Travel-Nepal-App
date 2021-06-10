import axios from "axios";


export interface ISignupParameters {
    username: string;
    email: string;
    password: string;
}

export const signupQuery = async (params: ISignupParameters) => {
    const response = await axios.request({
        url: "https://kqfymcgiok.execute-api.eu-west-2.amazonaws.com/v1/api/signup",
        method: "POST",
        data: {
            name: params.username,
            email: params.email,
            password: params.password
        }
    });

    return response.data;
}
