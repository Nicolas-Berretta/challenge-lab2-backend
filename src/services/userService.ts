import  UserRepository  from "../repositories/userRepository";
import {UserRepositoryInterface} from "../repositories/userRepositoryInterface";

class UserService {
    private userRepository: UserRepositoryInterface;

    constructor(userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository;
    }

    async getUserById(id: number) {
        return await this.userRepository.findById(id)
    }
    async createUser(name: string, email: string, password: string){
        return await this.userRepository.create(name, email, password)
    }
}

export default UserService