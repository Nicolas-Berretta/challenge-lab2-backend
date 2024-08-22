import express, {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {PublicUser, Token} from "../utils";

const secret :string = process.env.TOKEN_SECRET as string

class AuthService {
    async generateToken(user: PublicUser){
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
        return res.status(401).send({ error: 'No token provided' });
    }
    try {
        const user_data: Token = jwt.verify(token, secret) as Token
        console.log(user_data)
        next()
    } catch (err) {
        return res.status(401).send({ error: 'Invalid token' });
    }
}

export const authAdmin = async (req: Request, res: Response, next: NextFunction)  => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ error: 'No token provided' });
    }
    try {
        const user_data: Token = jwt.verify(token, secret) as Token
        console.log(user_data)
        if (user_data.id != 0){
            res.status(400).send({ error: 'Authorization' });
        }
        next()
    } catch (err) {
        return res.status(401).send({ error: 'Invalid token' });
    }
}

export default AuthService

