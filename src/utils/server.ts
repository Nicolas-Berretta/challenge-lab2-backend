import express from "express";
import {router} from "./const.ts";
import userController from "../controllers/userController.ts";
import {auth, authAdmin} from "../middleware/authMiddleware.ts";
import emailController from "../controllers/emailController.ts";
import adminController from "../controllers/adminController.ts";


function createServer() {
    const app = express();
    app.use(express.json())
    app.use("/api/users",userController)
    app.use("/api/emails",auth,emailController)
    app.use("/api/admin",authAdmin,adminController)

    return app;
}

export default createServer;