import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body;
        const user = await authService.signupService(username, email, password);
        res.status(201).json({ message: 'User created', user: { id: user._id, email: user.email, username: user.username } });
    } catch (err) {
        next(err);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const { accessToken, refreshToken, user } = await authService.loginService(email, password);

        // set refresh token as httpOnly cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({ accessToken, user });
    } catch (err) {
        next(err);
    }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.refreshToken;
        if (!token) return res.status(401).json({ message: 'No token' });
        const newAccess = await authService.refreshService(token);
        res.json({ accessToken: newAccess });
    } catch (err) {
        next(err);
    }
};

export const logout = async (_req: Request, res: Response) => {
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out' });
};
