import Order, { IOrder } from '../models/Order';
import mongoose from 'mongoose';

export const createOrderRepo = async (payload: Partial<IOrder>) => {
    return Order.create(payload);
};

export const findOrdersByUser = async (userId: string | mongoose.Types.ObjectId) => {
    return Order.find({ userId }).populate('productId');
};

export const findAllOrders = async () => {
    return Order.find().populate('productId').populate('userId', 'email username');
};
