import {Router} from "express";
import { PrismaClient } from '@prisma/client';
export const router: Router = Router();

const prisma = new PrismaClient()

export type PublicUser = {
    id: number
    name:string
    email:string
}
export type Token = {
    id:number
    name:string
    email:string
    expiresIn:string
}

const adminId = Number(process.env.ADMIN_ID as string)
export async function adAdmin() {
    await prisma.user.upsert({
        where: { email: process.env.ADMIN_EMAIL as string },
        update: {},
        create: {
            id:adminId,
            name: process.env.ADMIN_NAME as string,
            email: process.env.ADMIN_EMAIL as string,
            password: process.env.ADMIN_PASSWORD as string,
            rol: 'admin',
        },
    });
}