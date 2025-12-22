import { Request, Response, NextFunction } from 'express';
import * as orderService from '../services/order.service';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as any).user;
        if (!user) return res.status(401).json({ message: 'Unauthorized' });

        const { productId, selectedAlcohol, totalAmount, category } = req.body;
        const order = await orderService.createOrderService({
            userId: user.id,
            productId,
            category,
            selectedAlcohol,
            totalAmount
        } as any);
        const populated = await order.populate('productId');
        res.status(201).json(populated);
    } catch (err) {
        next(err);
    }
};

export const getMyOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as any).user;
        const orders = await orderService.listUserOrdersService(user.id);
        res.json(orders);
    } catch (err) {
        next(err);
    }
};

export const getAllOrders = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await orderService.listAllOrdersService();
        res.json(orders);
    } catch (err) {
        next(err);
    }
};
