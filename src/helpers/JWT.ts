import { Request } from 'express';
import { verify, JwtPayload, sign } from 'jsonwebtoken';

const secretToken =  getSecretToken();

function verifyToken(req: Request, userId?: number) {
    const token = getTokenFromRequest(req);
    const payload = getPayload(token);
    if (isNotAuth(userId, payload)) {
        throw new Error('not the same user!');
    }
}
function getSecretToken():string {
    return process.env.TOKEN_SECRET as string;
}
function getTokenFromRequest(req: Request):string {
    return (req.headers.authorization) ? req.headers.authorization.split(' ')[1] : '';
}
function getPayload(token: string) {
    return verify(token as string, secretToken) as JwtPayload;
}
function isNotAuth(userId: number| undefined, payload: JwtPayload) {
    return userId && payload.user.userId != userId;
}
function signToken(userId: number): string {
    return sign({user: {userId}}, secretToken);
}

export { verifyToken, signToken };