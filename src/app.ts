import express from 'express';
import userController from "./controllers/userController";

const app = express()
const port = 3000;

app.use(express.json())
app.use("/api", userController)

app.listen(port, () => {
   console.log(`Server running on http://localhost:${port}`);
});