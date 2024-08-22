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
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("./controllers/userController"));
const emailController_1 = __importDefault(require("./controllers/emailController"));
const adminController_1 = __importDefault(require("./controllers/adminController"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authService_1 = require("./services/authService");
const client_1 = require("@prisma/client");
const utils_1 = require("./utils");
const app = (0, express_1.default)();
const port = 3000;
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/users", userController_1.default);
app.use("/api/emails", authService_1.auth, emailController_1.default);
app.use("/api/admin", authService_1.authAdmin, adminController_1.default);
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
//export default app
(0, utils_1.adAdmin)()
    .catch(e => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
