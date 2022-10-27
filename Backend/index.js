import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
import authRouter from "./routes/auth.route.js";

const app = express(); 


//* Add User Router
app.use('/',authRouter)

//*This line is Config PORT 
const PORT = process.env.PORT || 5000;
//* Listen the PORT
app.listen(PORT,()=>console.log('http://localhost:'+ PORT));