import { UserRepositoryInterface } from './userRepositoryInterface';
import {User,PrismaClient} from "@prisma/client";
import bcryp from "bcrypt";

const prisma = new PrismaClient()

class UserRepository implements UserRepositoryInterface{
    async create(name: string, email: string, password: string): Promise<User> {
        const oldUser = await prisma.user.findFirst({where: {email: email}})
        if(oldUser){
            return Promise.reject(new Error("email already in use!"))
        }

        const hashedPassword = await bcryp.hash(password, 12);
        const user = prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword
            }
        })
        return Promise.resolve(user);
    }

    async findById(id: number): Promise<{ name: string; email: string; } | null> {
        return Promise.resolve(prisma.user.findFirst({
            where:{id: id},
            select:{
                id: true,
                name: true,
                email: true,
                password: false
            }
        }))
    }

    async update(user: User): Promise<User | null> {
        const updatedUser = prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                name: user.name,
                email: user.email,
                password: user.password
            }
        })
        return Promise.resolve(updatedUser);
    }

    async login(email: string, password: string): Promise<boolean> {
        const user = await prisma.user.findFirst({
            where: {
                email: email,
            }
        })

        return Promise.resolve(false);
    }
}
export default UserRepository