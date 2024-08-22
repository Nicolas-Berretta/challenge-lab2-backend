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
const utils_1 = require("../utils");
const adminService_1 = __importDefault(require("../services/adminService"));
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const userRepository = new userRepository_1.default();
const adminService = new adminService_1.default(userRepository);
utils_1.router.get("/get-users-stats", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stats = yield adminService.getUserStats();
        res.status(200).send({ stats });
    }
    catch (error) {
        res
            .status(500)
            .send(error instanceof Error ? error.message : "Server Error");
    }
}));
exports.default = utils_1.router;
