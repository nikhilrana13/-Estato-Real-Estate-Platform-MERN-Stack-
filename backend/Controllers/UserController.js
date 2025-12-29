import cloudinary from "../Config/cloudinary.js";
import { UserMapper } from "../Mappers/UserMapper.js";
import UserModel from "../Models/UserModel.js";
import { SendOtptoEmail } from "../utils/EmailService.js";
import { Response } from "../utils/Responsehandler.js";
import jwt from "jsonwebtoken"



// send otp to user email
export const SendOtptoUser = async(req,res)=>{
    try {
        const {email} = req.body 
        const Otp = Math.floor(1000 + Math.random() * 9000).toString(); // generate 4 digit otp 
        const expiry = new Date(Date.now() + 5 * 60 * 1000)
        // check if user exists
        const user = await UserModel.findOne({email})
        // if user exists only then send otp 
        if(user){
            user.emailOtp = Otp;
            user.emailOtpExpiry = expiry // 5 minutes from now
            await user.save();
              // send otp to email
            await SendOtptoEmail(email,Otp)
            return Response(res,200,"Otp sent to your email")
        }else{
            await UserModel.create({
                email,
                emailOtp:Otp,
                emailOtpExpiry:expiry
            })
            // send otp to email
            await SendOtptoEmail(email,Otp)
            return Response(res,200,"Otp sent to your email")
        }
    } catch (error) {
        console.error("Failed to send OTP to user email:", error);
        return Response(res,500,"Internal Server Error");
    }
}
// verify otp
export const VerifyOtp = async(req,res)=>{
    try {
        const {Otp} = req.body;
        // check if otp correct or not
        const user = await UserModel.findOne({emailOtp:Otp})
        if(!user){
            return Response(res,400,"Invalid Otp or Expired")
        }

        if(user.emailOtpExpiry < new Date()){
            return Response(res,400,"Otp Expired")
        }
        // clear otp after verify
        user.emailOtp = null,
        user.emailOtpExpiry = null,
        await user.save()

        // send jwt token
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"1d"})
        res.cookie("token",{httpOnly:true,secure:true,sameSite:"none"})

    return Response(res,200,"Login successfully",{ user: UserMapper(user), token })
        
    } catch (error) {
    console.log("failed to verify otp",error)
      return Response(res,500,"Internal Server error",error) 
    }
}
// logout
export const Logout = async(req,res)=>{
    try {
        res.clearCookie("token",{httpOnly:true,secure:true,sameSite:"none"})
        return Response(res,200,"Logout successfully")
    } catch (error) {
           console.log("failed to Logout",error)
      return Response(res,500,"Internal Server error")
    }
}
// update user profile 
export const UpdateUserProfile = async(req,res)=>{
    try {
        const userId = req.user
        const {username,phoneNumber,phonesuffix} = req.body 
        const file = req.file 
       
        const user = await UserModel.findById(userId)
        if(!user){
            return Response(res,404,"User not found")
        }
        
        let updateData = {}
        if(username) updateData.username = username
        if (phoneNumber) updateData.phoneNumber = phoneNumber;
        if (phonesuffix) updateData.phonesuffix = phonesuffix;

        if(file){
            //convert image to base64
            const imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
            // upload to cloudinary
           const cloudResponse = await cloudinary.uploader.upload(imageBase64,{
                folder:"estato-website",
                resource_type:"image",
           })
            // get the secure url of the uploaded image
            updateData.profilepic = cloudResponse.secure_url
        }
          // If no data to update
           if (Object.keys(updateData).length === 0) {
                   return Response(res, 400, "No fields provided to update");
            }
        const updatedUser = await UserModel.findByIdAndUpdate(userId,{...updateData},{new:true})
        return Response(res,200,"Profile Update successfully",updatedUser)
    } catch (error) {
          console.log("failed to update profile",error)
        return Response(res,500,"Internal Server error")
    }
}






