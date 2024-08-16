import {User} from "@prisma/client";

export interface UserRepositoryInterface {
    findById(id: number): Promise<{ name: string; email: string; } | null>;
    create(name: string, email:string, password: string): Promise<User>;
    login(email:string, password: string): Promise<boolean>
    update(user: User): Promise<User | null>
}
