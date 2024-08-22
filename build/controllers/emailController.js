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
Object.defineProperty(exports, "__esModule", { value: true });
const emailRepository_1 = require("../repositories/emailRepository");
const emailService_mts_1 = require("../services/emailService.mts");
const utils_1 = require("../utils");
const emailRepository = new emailRepository_1.EmailRepository();
const emailService = new emailService_mts_1.EmailService(emailRepository);
utils_1.router.post("/send-email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { from, to, subject, message } = req.body;
        if (!from || !to || !subject || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const emailAmount = yield emailRepository.countEmails(from);
        if (emailAmount >= 1000) {
            return res.status(400).send("email limit amount reached");
        }
        const emailData = { from: `${from}`, to: `${to}`, subject: `${subject}`, text: `${message}`, };
        const email = yield emailRepository.create(emailData);
        const emailResult = yield emailService.sendEmail(emailData);
        if (isSuccess(emailResult.status) && email) {
            return res
                .status(200)
                .send(`Email sent to ${to}`);
        }
        else {
            return res.status(400).json({ message: "An error occurred while sending email" });
        }
    }
    catch (error) {
        console.log(error);
    }
}));
function isSuccess(status) {
    return status === 200;
}
exports.default = utils_1.router;
