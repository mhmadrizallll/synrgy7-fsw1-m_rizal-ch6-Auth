import express from "express";
import { createInvoice, paymentInvoice } from "../controllers/invoicesControllers";
const router = express.Router();

router.post("/", createInvoice);
router.post("/payment/:id", paymentInvoice);

export default router;
