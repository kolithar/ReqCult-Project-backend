import * as productRepo from '../repositories/product.repository';
import { IProduct } from '../models/Product';

export const createProductService = async (payload: Partial<IProduct>) => {
    return productRepo.createProductRepo(payload);
};

export const updateProductService = async (id: string, payload: Partial<IProduct>) => {
    return productRepo.updateProductRepo(id, payload);
};

export const deleteProductService = async (id: string) => {
    return productRepo.deleteProductRepo(id);
};

export const listProductsService = async (category?: string, search?: string, isFamous?: boolean) => {
    const filter: any = {};
    if (category) filter.category = category;
    if (search) filter.search = search;
    if (isFamous !== undefined) filter.isFamous = isFamous;
    return productRepo.findProductsRepo(filter);
};

export const getProductService = async (id: string) => {
    return productRepo.findProductById(id);
};
