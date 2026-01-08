import PDFDocument from "pdfkit";

export const generateOrderPDF = (order: any) => {
    const doc = new PDFDocument();

    doc.fontSize(20).text("Juice Shop - Order Receipt", { align: "center" });
    doc.moveDown();

    doc.fontSize(12);
    doc.text(`Order ID: ${order._id}`);
    doc.text(`User: ${order.userId.email || "Customer"}`);
    doc.text(`Product: ${order.productId.name}`);
    doc.text(`Category: ${order.category}`);

    if (order.selectedAlcohol) {
        doc.text(`Alcohol Brand: ${order.selectedAlcohol}`);
    }

    doc.text(`Amount: Rs. ${order.totalAmount}`);
    doc.text(`Payment Status: ${order.paymentStatus}`);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleString()}`);

    doc.moveDown();
    doc.text("Thank you for your order!", { align: "center" });

    return doc;
};