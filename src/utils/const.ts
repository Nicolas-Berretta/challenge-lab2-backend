import bcryp from "bcrypt";
import {Router} from "express";
import {PrismaClient} from "@prisma/client";

export const router: Router = Router();

export const prisma = new PrismaClient()

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

export const salt: number = 12