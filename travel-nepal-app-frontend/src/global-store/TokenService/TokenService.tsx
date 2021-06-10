// import { TokenStorage } from "../../global-store/Queries"
import jwt_decode from "jwt-decode";

export const extractToken = (token: any) => {
      const decodedToken: any = jwt_decode(token);

    return decodedToken;
}