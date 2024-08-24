import {Router} from "express";
import { PrismaClient } from '@prisma/client';
import bcryp from "bcrypt";
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

const adminId: number = Number(process.env.ADMIN_ID as string)
export async function adAdmin() {
    const adminPass :string = await bcryp.hash(process.env.ADMIN_PASSWORD as string, 12)
    await prisma.user.upsert({
        where: { email: process.env.ADMIN_EMAIL as string },
        update: {},
        create: {
            id:adminId,
            name: process.env.ADMIN_NAME as string,
            email: process.env.ADMIN_EMAIL as string,
            password: adminPass,
            rol: 'admin',
        },
    });
}