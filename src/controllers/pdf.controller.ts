import { generateOrderPDF } from "../services/pdf.service";
import Order from "../models/Order";
import {Request, Response} from "express";
import PDFDocument from "pdfkit";

export const downloadOrderPDF = async (req: any, res: any) => {
    const order = await Order.findById(req.params.id)
        .populate("userId")
        .populate("productId");

    if (!order) return res.status(404).json({ message: "Order not found" });

    const pdf = generateOrderPDF(order);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
        "Content-Disposition",
        `attachment; filename=order-${order._id}.pdf`
    );

    pdf.pipe(res);
    pdf.end();
};

export const generateAllOrdersPDF = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find()
            .populate("userId")
            .populate("productId");

        const doc = new PDFDocument({ margin: 40 });

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=all-orders.pdf"
        );

        // ✅ VERY IMPORTANT
        doc.pipe(res);

        doc.fontSize(20).text("Juice Shop - All Orders Report", {
            align: "center",
        });
        doc.moveDown(2);

        orders.forEach((order: any, index: number) => {
            const userEmail =
                typeof order.userId === "object"
                    ? order.userId.email
                    : "N/A";

            const productName =
                typeof order.productId === "object"
                    ? order.productId.name
                    : "N/A";

            doc.fontSize(12).text(`Order #${index + 1}`, {
                underline: true,
            });
            doc.text(`Transaction ID: ${order.transactionId}`);
            doc.text(`User: ${userEmail}`);
            doc.text(`Product: ${productName}`);
            doc.text(`Amount: $${order.totalAmount}`);
            doc.text(
                `Date: ${new Date(order.createdAt).toLocaleString()}`
            );
            doc.moveDown();
        });

        // ✅ END PDF ONLY ONCE
        doc.end();

    } catch (error) {
        // ⚠️ ONLY send JSON if headers NOT sent
        if (!res.headersSent) {
            res.status(500).json({ message: "PDF generation failed" });
        }
    }
};
