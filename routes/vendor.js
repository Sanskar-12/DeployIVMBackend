import express from "express";
import {
  AddVendor,
  DeleteVendorById,
  GetAllVendor,
  GetVendorById,
} from "../controllers/vendor.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/vendor/add-vendor", isAuthenticated, AddVendor);//updated route see model before use and also there is enum so prefer model
router.get("/vendor/get-vendor",isAuthenticated, GetAllVendor);
router.get("/vendor/get-vendor-byId/:id", isAuthenticated, GetVendorById);
router.delete("/vendor/delete/vendor/:id", isAuthenticated, DeleteVendorById);

export default router;
