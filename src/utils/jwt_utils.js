import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";

const JWT_UTILS = {
    generateValidToken(user) {

        const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
            algorithm: 'HS256',
            jwtid: uuid(),
            audience: uuid()
        });

        return token;
    }

};

export default JWT_UTILS;