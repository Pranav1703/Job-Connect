import express  from "express";
import cors from "cors"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from 'mongoose'
import 'dotenv/config'
import UserRouter from "./routes/UserRoutes.js"
import JobRouter from "./routes/JobRoutes.js"
import { isAuthorized } from "./middleware/auth.js";
import ApplicationRouter from "./routes/ApplicationRoutes.js"

const PORT = 3000;
const mongoUrl = process.env.MONGO_URL as string;

const app = express();

app.use("/assets",express.static('assets'));
app.use("/storage",express.static('src/storage'));

app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

mongoose
.connect(mongoUrl, {
  dbName: "jobBoardDb",
})
.then(() => {
  console.log("Connected to database.");
})
.catch((err) => {
  console.log(`Some Error occured. ${err}`);
});


app.use("/user",UserRouter)
app.use("/job",JobRouter)
app.use("/application",ApplicationRouter)

app.get("/test",isAuthorized,(req,res)=>{
  console.log("token:",req.cookies)
  console.log("request body: ",req.body)
  res.status(200)
})

app.listen(PORT,()=>{
    console.log(`listening on Port ${PORT}`)
})