import * as orderRepo from '../repositories/order.repository';
import { IOrder } from '../models/Order';
import { generateTransactionId } from '../utils/transaction';

export const createOrderService = async (payload: Partial<IOrder>) => {
    // in production you would run payment here
    const transactionId = generateTransactionId();
    const order = await orderRepo.createOrderRepo({ ...payload, paymentStatus: 'success', transactionId });
    return order;
};

export const listUserOrdersService = async (userId: string) => {
    return orderRepo.findOrdersByUser(userId);
};

export const listAllOrdersService = async () => {
    return orderRepo.findAllOrders();
};
