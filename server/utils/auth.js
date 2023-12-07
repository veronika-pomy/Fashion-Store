import { verify, sign } from 'jsonwebtoken';

export function authMiddleware({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;
    if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
    }
    if (!token) {
        return req;
    }
    try {
        const { data } = verify(token, process.env.SECRET, { maxAge: process.env.EXPIRATION });
        req.user = data;
    } catch {
        console.log('Invalid token.');
    }
    return req;
}
export function signToken({ username, email, _id }) {
    const payload = { username, email, _id };
    return sign({ data: payload }, process.env.SECRET, { expiresIn: process.env.EXPIRATION });

}