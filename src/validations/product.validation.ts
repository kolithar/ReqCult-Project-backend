import { Request, Response, NextFunction } from 'express';

export const validateProduct = (req: Request, res: Response, next: NextFunction) => {
    const { category, image, name } = req.body;
    if (!category || !image || !name) return res.status(400).json({ message: 'category, image and name required' });
    next();
};
