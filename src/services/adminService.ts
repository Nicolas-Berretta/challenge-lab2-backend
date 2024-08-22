import {UserRepositoryInterface} from "../repositories/contracts/userRepositoryInterface";

class AdminService {
    private userRepository: UserRepositoryInterface

    constructor(userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository;
    }

    async getUserStats():Promise<{email: string, count: number}[]>{
        return this.userRepository.usersEmailStats()
    }
}
export default AdminService