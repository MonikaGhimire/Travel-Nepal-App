import axios from "axios";

export interface ILoginParameters {
    username: string;
    password: string;
}

export const loginQuery = async (params: ILoginParameters) => {
    const response = await axios.request({
        /// https://kqfymcgiok.execute-api.eu-west-2.amazonaws.com/v1/api/signup
        url: "https://kqfymcgiok.execute-api.eu-west-2.amazonaws.com/v1/api/login",
        method: "POST",
        data: {
            email: params.username,
            password: params.password
        }
    });

    return response.data;
}

// email: "monika.ghimire@test.com",
// password: "password",