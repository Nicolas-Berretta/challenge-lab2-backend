import {User} from "@prisma/client";
import {PublicUser} from "../../utils";

export interface UserRepositoryInterface {
    findById(id: number): Promise<{ name: string; email: string; } | null>;
    findByEmail(email:string): Promise<User | null>
    create(name: string, email:string, password: string): Promise<PublicUser>;
    update(user: User): Promise<User | null>
    delete(user: User): Promise<boolean>
    usersEmailStats(): Promise<{email: string, count: number}[]>
}
