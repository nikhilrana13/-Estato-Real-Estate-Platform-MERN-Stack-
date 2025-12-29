import express from "express"
import multer from "multer"
import { isAuthenticated } from "../Middlewares/isAuthenticated.js";
import { AddProperty, AddtoWishlestAndremove, DeleteProperty, EachPropertyDetails, EachUserListings, EachUserWishlest, FindPropertys, UpdateProPertyDetails } from "../Controllers/PropertyController.js";
import { ChatBotController } from "../Controllers/ChatBotController.js";
const router = express.Router()

// multer config
const storage = multer.memoryStorage();
const upload = multer({storage})



// routes
router.post("/add-property",upload.array("images",6),isAuthenticated,AddProperty)
router.get("/properties",FindPropertys)
router.get("/mylistings",isAuthenticated,EachUserListings)
router.get("/mywishlists",isAuthenticated,EachUserWishlest)
router.get("/:id",EachPropertyDetails)
router.put("/update/:id",upload.array("images",6),isAuthenticated,UpdateProPertyDetails)
router.delete("/delete/:id",isAuthenticated,DeleteProperty)
router.post("/:id/wishlist",isAuthenticated,AddtoWishlestAndremove)

// chatbot 
router.post("/chatsupport",isAuthenticated,ChatBotController)





export default router 