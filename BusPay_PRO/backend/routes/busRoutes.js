import express from "express";
import { createInvoice, getPayments } from "../controllers/busController.js";
const router = express.Router();

// POST /api/invoice
router.post("/invoice", createInvoice);
// GET /api/payments
router.get("/payments", getPayments);

export default router;
