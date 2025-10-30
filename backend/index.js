import express from 'express';
const app = express();
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js'
import cookieParser from 'cookie-parser';
import { startReminderCron } from './services/remainderEmail.js';
import cors from 'cors';

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin : "http://localhost:5173",credentials : true},));
const Port = process.env.PORT || 5000;

app.use("/user", userRouter);

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(Port);
    console.log("DB connected successfully");
    console.log("server is running on ", Port);
    
    startReminderCron(); 
    
}).catch((e) => {
    console.log("error occurred while connecting to DB", e);
    process.exit(1);
})