import {UserRepositoryInterface} from "../repositories/contracts/userRepositoryInterface";
import bcryp from "bcrypt";
import {UserType} from "../utils/types.ts";

class UserService {
    private userRepository: UserRepositoryInterface;

    constructor(userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository;
    }

    async getUserById(id: number): Promise<UserType | null> {
        return await this.userRepository.findById(id)
    }

    async getUserByEmail(email: string):Promise<UserType | null>{
        return await this.userRepository.findByEmail(email)
    }

    async createUser(name: string, email: string, password: string):Promise<UserType | null>{
        return await this.userRepository.create(name, email, password)
    }

    async login(email: string, password: string): Promise<UserType> {
        const user = await this.userRepository.findByEmail(email)
        if(!user) throw new Error("user not found")

        const isValid = await bcryp.compare(password, user.password)
        if(!isValid) throw new Error("invalid email or password ")

        return {id: user.id, name: user.name, email: user.email}
    }
}

export default UserService