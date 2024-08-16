import formData from 'form-data';
import Mailgun, {MailgunMessageData} from 'mailgun.js';
import {MessageOptions} from "node:child_process";
const mailgun = new Mailgun(formData);
const apiKey = process.env.MAILGUN_API_KEY || 'default-api-key';
const mailgunDomain = process.env.MAILGUN_DOMAIN|| 'default-domain';
const client = mailgun.client({
    username: 'api',
    key: apiKey
});

class EmailService {
    async sendEmail(emailData: MailgunMessageData) {
        return await client.messages.create(mailgunDomain, emailData)
    }
}
export default EmailService;
