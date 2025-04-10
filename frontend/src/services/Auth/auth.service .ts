import { jwtDecode } from "jwt-decode";

const decodeJWT = (token: string): any => {
    if (!token) {
        throw new Error("Token is required");
    }

    return jwtDecode(token);
};

export default decodeJWT;
