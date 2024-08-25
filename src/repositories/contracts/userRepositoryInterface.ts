import {User} from "@prisma/client";
import {Stat, UserType} from "../../utils/types.ts";

export interface UserRepositoryInterface {
    findById(id: number): Promise<UserType | null>;
    findByEmail(email:string): Promise<User | null>
    create(name: string, email:string, password: string): Promise<UserType>;
    update(user: UserType): Promise<UserType | null>
    delete(user: UserType): Promise<UserType>
    usersEmailStats(): Promise<Stat[]>
}
