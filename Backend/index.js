import "dotenv/config";
import app from "./app.js";
import "./database/connectdb.js";
import { initialSetup } from "./libs/initialSetup.js";

//* Create Admin and Roles
initialSetup();

//* This line is Config PORT 
const PORT = process.env.PORT || 5000;
//* Listen the PORT
app.listen(PORT,()=>console.log('http://localhost:'+ PORT));