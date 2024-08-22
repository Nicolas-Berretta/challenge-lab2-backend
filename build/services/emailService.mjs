"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const form_data_1 = __importDefault(require("form-data"));
const mailgun_js_1 = __importDefault(require("mailgun.js"));
const mailgun = new mailgun_js_1.default(form_data_1.default);
const apiKey = process.env.MAILGUN_API_KEY || 'default-api-key';
const mailgunDomain = process.env.MAILGUN_DOMAIN || 'default-domain';
const client = mailgun.client({
    username: 'api',
    key: apiKey
});
class EmailService {
    constructor(emailRepository) {
        this.emailRepository = emailRepository;
    }
    sendEmail(emailData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client.messages.create(mailgunDomain, emailData);
        });
    }
}
exports.EmailService = EmailService;
