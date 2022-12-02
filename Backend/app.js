import "dotenv/config";
import cookieParser from "cookie-parser";
import express from "express";
import authRouter from "./routes/auth.route.js";
const app = express(); 
//* Enable submit json
app.use(express.json());
//* Enable cookies
app.use(cookieParser());

//* Add User Router
app.use('/api/v1/auth',authRouter)

export default app;