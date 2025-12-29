import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { configure } from './Config/db.js'
import UserRoute from "./Routes/UserRoute.js"
import PropertyRoute from "./Routes/PropertyRoute.js"
import LeadRoute from "./Routes/LeadRoute.js"
import multer from "multer"


dotenv.config();

const PORT = process.env.PORT
const app = express();

// middleware
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



// routes
app.use("/user",UserRoute)
app.use("/property",PropertyRoute)
app.use("/lead",LeadRoute)





// Multer / other error handler
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) return res.status(400).json({ success:false, message: err.message });
  if (err) return res.status(400).json({ success:false, message: err.message });
  next();
});
// 404 handler
app.use((req,res) => res.status(404).json({success:false,message:"Route not found"}))

// connect to MongoDB
configure()



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})