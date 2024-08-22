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
exports.EmailRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class EmailRepository {
    create(emailData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const from = (_a = emailData.from) !== null && _a !== void 0 ? _a : '';
            const subject = (_b = emailData.subject) !== null && _b !== void 0 ? _b : '';
            const to = Array.isArray(emailData.to) ? emailData.to : [emailData.to];
            const filteredTo = to.filter((item) => item !== undefined);
            const body = (_c = emailData.text) !== null && _c !== void 0 ? _c : '';
            return prisma.email.create({
                data: {
                    sender: { connect: { email: from } },
                    subject: subject,
                    to: filteredTo,
                    body: body
                }
            });
        });
    }
    findManyBySender(email) {
        return __awaiter(this, void 0, void 0, function* () {
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
            });
        });
    }
    findById(email_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.email.findFirst({ where: { id: email_id } });
        });
    }
    countEmails(email) {
        return prisma.email.count({
            where: {
                senderEmail: email
            }
        });
    }
}
exports.EmailRepository = EmailRepository;
