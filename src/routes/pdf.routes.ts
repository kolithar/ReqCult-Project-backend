import { Router } from "express";
import {downloadOrderPDF, generateAllOrdersPDF} from "../controllers/pdf.controller";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router();

router.get("/order/:id", authMiddleware, downloadOrderPDF);
router.get("/orders", authMiddleware, generateAllOrdersPDF);

export default router;
