import express from "express";
import { createWorkOrder, deleteWorkOrder, getAllWorkOrder, getWorkOrder } from "../controllers/workOrder.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create/workorder",isAuthenticated,createWorkOrder)
router.get("/get/workorder/:id",isAuthenticated,getWorkOrder)
router.get("/get/all/workorder",isAuthenticated,getAllWorkOrder)
router.delete("/delete/workorder/:id",isAuthenticated,deleteWorkOrder)


export default router;
