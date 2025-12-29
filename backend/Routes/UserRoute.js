import express from "express"
import { Logout, SendOtptoUser, UpdateUserProfile, VerifyOtp } from "../Controllers/UserController.js"
import multer from "multer"
import { isAuthenticated } from "../Middlewares/isAuthenticated.js";
const router = express.Router()

// multer config
const storage = multer.memoryStorage();
const upload = multer({storage})

// routes
router.post("/send-otp",SendOtptoUser)
router.post("/verify-otp",VerifyOtp)
router.get("/logout",Logout)

// profile route 
router.put("/update-profile",upload.single("profilepic"),isAuthenticated,UpdateUserProfile)

export default router 