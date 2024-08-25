import {Request, Response} from "express";
import {EmailRepository} from "../repositories/emailRepository";
import {EmailService} from '../services/emailService.mts';
import {MailgunMessageData} from "mailgun.js";
import {router} from "../utils/const.ts";
import {EmailData, EmailSendResult} from "../utils/types.ts";

const emailRepository = new EmailRepository()
const emailService = new EmailService(emailRepository);

router.post("/send-email", async (req: Request, res: Response)=>{
    try {
        const { from, to , subject, body} = req.body;
        if (!from || !to || !subject || !body) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const emailAmount = await emailRepository.countEmails(from)
        if(emailAmount >= 1000) {
            return res.status(400).send("email limit amount reached")
        }
        const emailData: EmailData = {from: from, to: to, subject: subject, body: body}

        const email= await emailRepository.create(emailData)
        const emailResult: EmailSendResult = await emailService.sendEmail(emailData)
        if(isSuccess(emailResult.status) && email){
            return res
                .status(200)
                .send(`Email sent to ${to}`)
        } else {
            return res.status(400).json({ message: "An error occurred while sending email" });
        }
    } catch (error) {
        console.log(error)

    }
})

function isSuccess(status: number):boolean {
    return status === 200
}

export default router;
