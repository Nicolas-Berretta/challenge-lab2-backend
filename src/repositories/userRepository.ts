import {UserRepositoryInterface} from './contracts/userRepositoryInterface';
import {PrismaClient, User} from "@prisma/client";
import bcryp from "bcrypt";
import {Stat, UserType} from "../utils/types.ts";
import {Stats} from "node:fs";

const prisma = new PrismaClient()

class UserRepository implements UserRepositoryInterface{
    async create(name: string, email: string, password: string): Promise<UserType> {
        const oldUser = await prisma.user.findFirst({where: {email: email}})
        if(oldUser){
           throw new UserError("Email already associated with an account", 400)
        }
        const hash = await bcryp.hash(password, 12);
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hash
            }
        })
        return {id: user.id, name: user.name, email: user.email}
    }

    async findById(userId: number): Promise<UserType | null> {
        return  Promise.resolve(prisma.user.findFirst({
            where:{id: userId,isActive: true},
            select:{
                id: true,
                name: true,
                email: true,
                password: false
            }
        }))
    }

    async findByEmail(email:string):  Promise<User | null> {
        return prisma.user.findFirst({
            where:{
                email:email,
                isActive: true
            }
        })
    }

    async update(user: User): Promise<User | null> {
        return  prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                name: user.name,
                email: user.email,
                password: user.password
            }
        })
    }

    async delete(user: UserType): Promise<UserType> {
        return prisma.user.delete({
            where: {
                id:user.id,
                name:user.name,
                email:user.email
            }
        })

    }

    async usersEmailStats():Promise<Stat[]>{
        const startOfDay = new Date(new Date().setHours(0, 0, 0, 0));
        const endOfDay = new Date(new Date().setHours(23, 59, 59, 999));
        const usersWithEmailCount = await prisma.user.findMany({
            select: {
                email: true,
                _count: {
                    select: {
                        emails: {
                            where: {
                                sentDate: {
                                    gte: startOfDay,
                                    lt: endOfDay,
                                },
                            },
                        },
                    },
                },
            },
        });

        return usersWithEmailCount.map(user => ({
            email: user.email,
            count: user._count.emails,
        })).filter(user => user.count  > 0);
    }
}

export class UserError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;

        Object.setPrototypeOf(this, UserError.prototype);
    }
}

export default UserRepository