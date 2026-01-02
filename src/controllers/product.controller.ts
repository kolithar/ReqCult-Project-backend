import { Request, Response, NextFunction } from 'express';
import * as productService from '../services/product.service';

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const p = await productService.createProductService(req.body);
        res.status(201).json(p);
    } catch (err) {
        next(err);
    }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updated = await productService.updateProductService(req.params.id, req.body);
        res.json(updated);
    } catch (err) {
        next(err);
    }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await productService.deleteProductService(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) {
        next(err);
    }
};

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = req.query.category as string | undefined;
        const search = req.query.search as string | undefined;
        const isFamous = req.query.isFamous === 'true' ? true : req.query.isFamous === 'false' ? false : undefined;
        const products = await productService.listProductsService(category, search, isFamous);
        res.json(products);
    } catch (err) {
        next(err);
    }
};

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const p = await productService.getProductService(req.params.id);
        if (!p) return res.status(404).json({ message: 'Not found' });
        res.json(p);
    } catch (err) {
        next(err);
    }
};
