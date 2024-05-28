import express from "express";
import {
  createInvoice,
  getPayment,
  paymentInvoice,
} from "../controllers/invoicesControllers";
import { authorization } from "../middlewares/authorization";
const router = express.Router();

router.get("/", getPayment);
router.post("/", authorization, createInvoice);
router.post("/payment/:id", paymentInvoice);

export default router;
