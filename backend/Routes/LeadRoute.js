import express from "express"
import multer from "multer"
import { isAuthenticated } from "../Middlewares/isAuthenticated.js";
import { AddleadtoProperty, EachUserPropertyLeads } from "../Controllers/PropertyController.js";
const router = express.Router()

// multer config
const storage = multer.memoryStorage();
const upload = multer({storage})

// routes
router.post('/add-lead',isAuthenticated,AddleadtoProperty)
router.get('/all-leads',isAuthenticated,EachUserPropertyLeads)

export default router 