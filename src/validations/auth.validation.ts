import { Request, Response, NextFunction } from 'express';

export const validateSignup = (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ message: 'username, email and password required' });
    next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'email and password required' });
    next();
};
