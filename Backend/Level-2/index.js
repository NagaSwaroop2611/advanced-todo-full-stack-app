import express from "express";
import "dotenv/config";
import cors from "cors";
import db from "./utils/db.js";
import router from "./routes/taskRoutes.js";


const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.urlencoded({extended : true}));
app.use(express.json()); //convert data into json format data

// Connect to database
db();

// routes
app.use("/api/v2",router);

// connection
app.listen(port,()=>{
  console.log(`Server is running on port ${port}... 🤩`);
  
})