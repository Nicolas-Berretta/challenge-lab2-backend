import {Router, Request, Response} from "express";
import UserService from "../services/userService";
import UserRepository from "../repositories/userRepository";
import EmailService from "../services/emailService.mjs"
import {MailgunMessageData} from "mailgun.js";


const router: Router = Router();
const userRepository = new UserRepository()
const userService = new UserService(userRepository);
const emailService = new EmailService();

router.get( "/user-by-id", async (req: Request, res: Response) => {
    try {
        const id: number = req.body.id
        const user = await userService.getUserById(id)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error)
        res
            .status(500)
            .send(error instanceof Error ? error.message : "Server Error")
    }
});

router.post("/register", async (req: Request, res: Response)=>{
    try {
        const name: string = req.body.name
        const email: string = req.body.email
        const password: string = req.body.password
        const result = await userService.createUser(name,email, password)
        if(!result){
            return res.status(400).json({ message: "Issue " });
        }
        res.status(200).json({message: "User created!"});
    } catch (error) {
        console.log(error)
        res
            .status(500)
            .send(error instanceof Error ? error.message : "Server Error")
    }
})

router.post("/send-email", async (req: Request, res: Response)=>{
    try {
        const { from, to, subject, message} = req.body;
        if (!from || !to || !subject || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const emailData: MailgunMessageData = {
            from: `Nicolas <${from}>`,
            to: `${to}`,
            subject: `${subject}`,
            text: `${message}`,
        }
        const emailResult = await emailService.sendEmail(emailData)
        console.log(emailResult.status)
        if(isSuccess(emailResult.status)){
            return res
                .status(200)
                .send(`Email sent to ${to}`)
        } else {
            return res.status(400).json({ message: "An error occurred while sending email" });
        }
    } catch (error) {
        console.log(error)
        res
            .status(500)
            .send(error instanceof Error ? error.message : "Server Error")
    }
})

function isSuccess(status: number):boolean {
    return status === 200
}

export default router;