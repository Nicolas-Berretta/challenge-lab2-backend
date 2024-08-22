"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const userService_1 = __importDefault(require("../services/userService"));
const userRepository_1 = __importStar(require("../repositories/userRepository"));
const authService_1 = __importDefault(require("../services/authService"));
const utils_1 = require("../utils");
const authService = new authService_1.default();
const userRepository = new userRepository_1.default();
const userService = new userService_1.default(userRepository);
utils_1.router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const userResult = yield userService.createUser(name, email, password);
        if (userResult) {
            const token = yield authService.generateToken(userResult);
            res.status(200).send({ token });
        }
    }
    catch (error) {
        if (error instanceof userRepository_1.UserError) {
            res
                .status(error.status)
                .send(error.message);
        }
        else {
            res
                .status(500)
                .send(error instanceof Error ? error.message : "Server Error");
        }
    }
}));
utils_1.router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const result = yield userService.login(email, password);
        if (!result) {
            res.status(400).send(result);
        }
        else {
            const token = yield authService.generateToken(result);
            res.status(200).send({ result, token });
        }
    }
    catch (error) {
        res
            .status(500)
            .send(error instanceof Error ? error.message : "Server Error");
    }
}));
exports.default = utils_1.router;
