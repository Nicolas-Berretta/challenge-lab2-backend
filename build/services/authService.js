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
exports.authAdmin = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.TOKEN_SECRET;
class AuthService {
    generateToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return jsonwebtoken_1.default.sign({ id: user.id, name: user.name, email: user.email }, secret, { expiresIn: '1h' });
        });
    }
}
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ error: 'No token provided' });
    }
    try {
        const user_data = jsonwebtoken_1.default.verify(token, secret);
        console.log(user_data);
        next();
    }
    catch (err) {
        return res.status(401).send({ error: 'Invalid token' });
    }
});
exports.auth = auth;
const authAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ error: 'No token provided' });
    }
    try {
        const user_data = jsonwebtoken_1.default.verify(token, secret);
        console.log(user_data);
        if (user_data.id != 0) {
            res.status(400).send({ error: 'Authorization' });
        }
        next();
    }
    catch (err) {
        return res.status(401).send({ error: 'Invalid token' });
    }
});
exports.authAdmin = authAdmin;
exports.default = AuthService;
