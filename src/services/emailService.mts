import formData from 'form-data';
import Mailgun, {MailgunMessageData} from 'mailgun.js';
import {EmailRepositoryInterface} from "../repositories/contracts/emailRepositoryInterface";
import {EmailData, EmailSendResult} from "../utils/types.ts";
import {MessagesSendResult} from "mailgun.js/Types/Messages";
const mailgun = new Mailgun(formData);
const apiKey = process.env.MAILGUN_API_KEY || 'default-api-key';
const mailgunDomain = process.env.MAILGUN_DOMAIN|| 'default-domain';

const client = mailgun.client({
    username: 'api',
    key: apiKey
});

export class EmailService {
    private emailRepository : EmailRepositoryInterface;

    constructor(emailRepository: EmailRepositoryInterface) {
        this.emailRepository = emailRepository;
    }

    async sendEmail(emailData: EmailData): Promise<EmailSendResult>{
        let mailGunData: MailgunMessageData = {
            from: `${emailData.from}`,
            to: `${emailData.to}`,
            subject: `${emailData.subject}`,
            text: `${emailData.body}`,}

        return await client.messages.create(mailgunDomain, mailGunData)
    }
}

