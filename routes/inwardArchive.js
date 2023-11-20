import express from "express"
import { isAuthenticated } from "../middlewares/auth.js"
import { inwardArchive } from "../controllers/inwardArchive.js"

const router=express.Router()

router.get("/get/inward/archived/orders",isAuthenticated,inwardArchive)

export default router