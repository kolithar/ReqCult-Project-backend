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
    const query: any = {};
    
    if (filter.category) {
        query.category = filter.category;
    }
    
    if (filter.isFamous !== undefined) {
        query.isFamous = filter.isFamous;
    }
    
    if (filter.search) {
        const searchRegex = new RegExp(filter.search, 'i');
        query.$or = [
            { name: searchRegex },
            { description: searchRegex },
            { ingredients: { $in: [searchRegex] } }
        ];
    }
    
    return Product.find(query);
};

export const findProductById = async (id: string) => {
    return Product.findById(id);
};
