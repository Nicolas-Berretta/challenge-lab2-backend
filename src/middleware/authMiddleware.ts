import express, {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {UserType, Token} from "../utils/types.ts";

const secret :string = process.env.TOKEN_SECRET as string

class AuthMiddleware {
    async generateToken(user: UserType){
        return jwt.sign(
            {id: user.id, name: user.name, email:user.email},
            secret,
            {expiresIn: '1h'}
        )
    }
}

export const auth = async (req: Request, res: Response, next: NextFunction)  => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(400).send({ error: 'No token provided' });
    }
    try {
        const user_data: Token = jwt.verify(token, secret) as Token
        next()
    } catch (err) {
        return res.status(400).send({ error: 'Invalid token' });
    }
}

export const authAdmin = async (req: Request, res: Response, next: NextFunction)  => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(400).send({ error: 'No token provided' });
    }
    try {
        const user_data: Token = jwt.verify(token, secret) as Token
        if (user_data.id != 0){
            return res.status(400).send({ error: 'Unauthorized user' });
        }
        next()
    } catch (err) {
        return res.status(400).send({ error: 'Invalid token' });
    }
}

export default AuthMiddleware

