import { Response } from "../utils/Responsehandler.js";
import jwt from "jsonwebtoken"

export const isAuthenticated = async(req,res,next)=>{
         const authHeader = req.headers.authorization;
         if(!authHeader || !authHeader.startsWith("Bearer ")){
            return Response(res,401,"Unauthorized or invalid token")
         }
         try {
             const token = authHeader.split(" ")[1];
             const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
             req.user = decoded.id 
             next()
            
         } catch (error) {
           console.log("failed to verify token",error)
           return Response(res,401,"Error in Authentication middleware")
         }
}