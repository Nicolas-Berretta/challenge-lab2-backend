import {Email} from "@prisma/client";
import {MailgunMessageData} from "mailgun.js";
import {EmailData, EmailType} from "../../utils/types.ts";


export interface EmailRepositoryInterface {
    create(emailData: EmailData): Promise<EmailType>
    findManyBySender(email: string): Promise<EmailType[]>
    countEmails(email: string): Promise<number>
    findById(id: number): Promise<EmailType | null>
}