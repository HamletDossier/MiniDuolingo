import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
const app = express(); 

//*This line is say Ok
app.get('/',(req,res)=>{res.json({'ok':true})})
//*This line is Config PORT 
const PORT = process.env.PORT || 5000;
//* Listen the PORT
app.listen(PORT,()=>console.log('http://localhost:'+ PORT));