import cookieParser from "cookie-parser";
import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
import authRouter from "./routes/auth.route.js";

const app = express(); 

//* Enable submit json
app.use(express.json());
//* Enable cookies
app.use(cookieParser());

//* Add User Router
app.use('/api/v1/auth',authRouter)

//* This line is Config PORT 
const PORT = process.env.PORT || 5000;
//* Listen the PORT
app.listen(PORT,()=>console.log('http://localhost:'+ PORT));