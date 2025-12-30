import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';

export const roleMiddleware = (role: 'admin' | 'user') => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        const user = req.user;
        if (!user) return res.status(401).json({ message: 'Unauthorized' });
        if (user.role !== role) return res.status(403).json({ message: 'Forbidden' });
        next();
    };
};
