import Product, { IProduct } from '../models/Product';
import mongoose from 'mongoose';

export const createProductRepo = async (payload: Partial<IProduct>) => {
    return Product.create(payload);
};

export const updateProductRepo = async (id: string, payload: Partial<IProduct>) => {
    return Product.findByIdAndUpdate(id, payload, { new: true });
};

export const deleteProductRepo = async (id: string) => {
    return Product.findByIdAndDelete(id);
};

export const findProductsRepo = async (filter: any = {}) => {
    return Product.find(filter);
};

export const findProductById = async (id: string) => {
    return Product.findById(id);
};
