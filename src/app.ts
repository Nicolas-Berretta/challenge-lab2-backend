import express from 'express';
import userController from "./controllers/userController";
import emailController from "./controllers/emailController"
import adminController from "./controllers/adminController";
import cookieParser from 'cookie-parser'
import {auth, authAdmin} from "./services/authService";
import { PrismaClient } from '@prisma/client';
import {adAdmin} from "./utils";

const app = express()
const port = 3000;

const prisma = new PrismaClient();
app.use(express.json())
app.use(cookieParser())


app.use("/api/users",userController)
app.use("/api/emails",auth,emailController)
app.use("/api/admin",authAdmin,adminController)


app.listen(port, () => {
   console.log(`Server running on http://localhost:${port}`);
});

//export default app

adAdmin()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });