import express from "express";
import { createWorkOrder, getWorkOrder } from "../controllers/workOrder.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create/workorder",isAuthenticated,createWorkOrder)
router.get("/get/workorder/:id",isAuthenticated,getWorkOrder)


export default router;
