import {Request, Response} from "express";
import UserService from "../services/userService";
import UserRepository, {UserError} from "../repositories/userRepository";
import AdminService from "../services/adminService"
import AuthMiddleware from "../middleware/authMiddleware.ts";
import {router} from "../utils/const.ts";

const authService = new AuthMiddleware()
const userRepository = new UserRepository()
const userService = new UserService(userRepository);


router.post("/register", async (req: Request, res: Response)=>{
    try {
        const {name, email, password} = req.body
	    const userResult = await userService.createUser(name,email, password)
        if(userResult){
            const token = await authService.generateToken(userResult)
            res.status(200).send({token})
        }

    } catch (error) {
        if (error instanceof UserError){
            res
                .status(error.status)
                .send(error.message)
        } else {
            res
                .status(500)
                .send(error instanceof Error ? error.message : "Server Error")
        }
    }
})

router.post("/login", async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body
        const result = await userService.login(email, password)
        if(!result){
            res.status(400).send("bad request")
        } else {
            const token = await authService.generateToken(result)
            res.status(200).send({ token})
        }
    } catch (error){
        res
            .status(500)
            .send(error instanceof Error ? error.message : "Server Error")
    }
})

export default router;
