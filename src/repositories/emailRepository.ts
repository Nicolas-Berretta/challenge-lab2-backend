import { EmailRepositoryInterface } from './contracts/emailRepositoryInterface'
import {MailgunMessageData} from "mailgun.js";
import {Email, PrismaClient, User} from "@prisma/client";
import e from "express";
import {from} from "form-data";

const prisma = new PrismaClient()

export class EmailRepository implements  EmailRepositoryInterface {

    async create(emailData: MailgunMessageData): Promise<Email> {
        const from = emailData.from ?? '';
        const subject = emailData.subject ??'';
        const to: (string | undefined)[] = Array.isArray(emailData.to) ? emailData.to : [emailData.to]
        const filteredTo: string[] = to.filter((item): item is string => item !== undefined);
        const body = emailData.text ??'';
        return  prisma.email.create({
            data:{
                sender: { connect: {email:from}},
                subject: subject,
                to: filteredTo,
                body: body
            }
        })
    }

    async findManyBySender(email: string): Promise<Email[]> {
        const startOfDay = new Date(new Date().setHours(0, 0, 0, 0));
        const endOfDay = new Date(new Date().setHours(23, 59, 59, 999));
        return prisma.email.findMany({
            where: {
                senderEmail: email,
                sentDate: {
                   gte: startOfDay,
                   lt: endOfDay
                }
            }
        })
    }

    async findById(email_id: number): Promise<Email | null> {
        return prisma.email.findFirst({where:{id:email_id}})
    }

    countEmails(email: string): Promise<number> {
        return prisma.email.count({
            where:{
                senderEmail:email
            }
        })
    }

}
