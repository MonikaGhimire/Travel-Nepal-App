
export const isTokenExpired = (expDate: Date): boolean => {
    return new Date(expDate) < new Date(Date.now());
};