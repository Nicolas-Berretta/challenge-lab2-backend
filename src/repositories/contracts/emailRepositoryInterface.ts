import {Email} from "@prisma/client";
import {MailgunMessageData} from "mailgun.js";


export interface EmailRepositoryInterface {
    create(emailData: MailgunMessageData): Promise<Email>
    findManyBySender(email: string): Promise<Email[]>
    countEmails(email: string): Promise<number>
    findById(id: number): Promise<Email | null>
}