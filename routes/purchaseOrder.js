import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { createPurchaseOrder, getPurchaseOrder } from "../controllers/purchaseOrder.js";

const router = express.Router();

router.post("/create/purchaseorder",isAuthenticated,createPurchaseOrder)
router.get("/get/purchaseorder/:id",isAuthenticated,getPurchaseOrder)


export default router;
