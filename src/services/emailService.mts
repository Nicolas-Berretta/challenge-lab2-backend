import formData from 'form-data';
import Mailgun, {MailgunMessageData} from 'mailgun.js';
import {EmailRepositoryInterface} from "../repositories/contracts/emailRepositoryInterface";
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

    async sendEmail(emailData: MailgunMessageData) {
        return await client.messages.create(mailgunDomain, emailData)
    }
}

