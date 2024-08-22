import {UserRepositoryInterface} from "../repositories/contracts/userRepositoryInterface";
import bcryp from "bcrypt";
import {PublicUser} from "../utils";

class UserService {
    private userRepository: UserRepositoryInterface;

    constructor(userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository;
    }

    async getUserById(id: number) {
        return await this.userRepository.findById(id)
    }
    async createUser(name: string, email: string, password: string):Promise<PublicUser | null>{
        return await this.userRepository.create(name, email, password)
    }
    async login(email: string, password: string) {
        const user = await this.userRepository.findByEmail(email)
        if(!user) throw new Error("user not found")

        const isValid = await bcryp.compare(password, user.password)
        if(!isValid) throw new Error("invalid email or password ")

        const publicUser: PublicUser = {id:user.id, name:user.name, email:user.email}
        return publicUser
    }
}

export default UserService