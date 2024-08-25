import {Request, Response} from "express";
import {router} from "../utils/const.ts";
import AdminService from "../services/adminService";
import UserRepository from "../repositories/userRepository";

const userRepository =new  UserRepository()
const adminService = new AdminService(userRepository)

router.get("/get-users-stats", async (req: Request, res: Response) =>{
    try {
        const stats = await adminService.getUserStats()
        res.status(200).send({stats})
    } catch (error) {
        res
            .status(500)
            .send(error instanceof Error ? error.message : "Server Error")
    }
})

export default router