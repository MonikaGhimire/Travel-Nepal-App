export namespace TokenStorage {
    const __SET = (key: string, value: any) => {
        window.localStorage.setItem(key, value);
    }

    const __GET = (key: string) => {
       return window.localStorage.getItem(key);
    }

    const __DELETE = (key: string) => {
        localStorage.removeItem(key);
    };

    export const storeToken = (data: any) => {
        __SET("access_token", JSON.stringify(data));
    } 

    export const retrieveToken = (key: string) => {
        const token: string | null = __GET(key);
        return (token === null) ? null : JSON.parse(token);
    };

    export const clearToken = () => {
        __DELETE("access_token");
    };
}
