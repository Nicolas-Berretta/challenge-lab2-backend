import { EmailRepositoryInterface } from './contracts/emailRepositoryInterface'
import {MailgunMessageData} from "mailgun.js";
import {Email, PrismaClient, User} from "@prisma/client";
import e from "express";
import {from} from "form-data";
import {EmailData, EmailType} from "../utils/types.ts";

const prisma = new PrismaClient()

export class EmailRepository implements  EmailRepositoryInterface {

    async create(emailData: EmailData): Promise<EmailType> {

        const {from, subject, to, body } = emailData
        return  prisma.email.create({
            data:{
                sender: { connect: {email:from}},
                subject: subject,
                to: to,
                body: body
            }
        })
    }

    async findManyBySender(email: string): Promise<EmailType[]> {
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

    async findById(email_id: number): Promise<EmailType | null> {
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
