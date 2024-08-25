import userController from "./controllers/userController";
import emailController from "./controllers/emailController"
import adminController from "./controllers/adminController";
import {auth, authAdmin} from "./middleware/authMiddleware.ts";
import {adAdmin, prisma} from "./utils/const.ts"
import createServer from "./utils/server.ts";

const port = 3000;
const app = createServer()


app.listen(port, () => {
   console.log(`Server running on http://localhost:${port}`);
});

adAdmin()
    .catch((e: any) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
