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
exports.UserError = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
class UserRepository {
    create(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const oldUser = yield prisma.user.findFirst({ where: { email: email } });
            if (oldUser) {
                throw new UserError("Email already associated with an account", 400);
            }
            const hash = yield bcrypt_1.default.hash(password, 12);
            const user = yield prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: hash
                }
            });
            return { id: user.id, name: user.name, email: user.email };
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(prisma.user.findFirst({
                where: { id: id, isActive: true },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: false
                }
            }));
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.user.findFirst({
                where: {
                    email: email,
                    isActive: true
                }
            });
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.user.update({
                where: {
                    id: user.id,
                    isActive: true
                },
                data: {
                    name: user.name,
                    email: user.email,
                    password: user.password
                }
            });
        });
    }
    delete(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = prisma.user.update({
                where: {
                    id: user.id,
                    isActive: true
                },
                data: {
                    isActive: false
                }
            });
            return Promise.resolve(!user.isActive); //(!false) -> true, meaning the deletion was successful
        });
    }
    usersEmailStats() {
        return __awaiter(this, void 0, void 0, function* () {
            const startOfDay = new Date(new Date().setHours(0, 0, 0, 0));
            const endOfDay = new Date(new Date().setHours(23, 59, 59, 999));
            const usersWithEmailCount = yield prisma.user.findMany({
                select: {
                    email: true,
                    _count: {
                        select: {
                            emails: {
                                where: {
                                    sentDate: {
                                        gte: startOfDay,
                                        lt: endOfDay,
                                    },
                                },
                            },
                        },
                    },
                },
            });
            return usersWithEmailCount.map(user => ({
                email: user.email,
                count: user._count.emails,
            })).filter(user => user.count > 0);
        });
    }
}
class UserError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        Object.setPrototypeOf(this, UserError.prototype);
    }
}
exports.UserError = UserError;
exports.default = UserRepository;
