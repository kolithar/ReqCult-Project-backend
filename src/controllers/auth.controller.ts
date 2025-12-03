import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;
    try {
        const user = await AuthService.register(name, email, password, role);
        res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const { accessToken, refreshToken, user } = await AuthService.login(email, password);

        // Set refresh token in httpOnly cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.COOKIE_SECURE === "true",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000 // sync with env
        });

        res.json({ accessToken, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (err: any) {
        res.status(401).json({ message: err.message });
    }
};

export const refresh = async (req: Request, res: Response) => {
    const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: "No refresh token provided" });
    try {
        const { accessToken, refreshToken: newRefreshToken } = await AuthService.refreshTokens(refreshToken);

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.COOKIE_SECURE === "true",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({ accessToken });
    } catch (err: any) {
        res.status(401).json({ message: err.message });
    }
};

export const logout = async (req: Request, res: Response) => {
    const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;
    if (!refreshToken) return res.status(204).send();
    await AuthService.logout(refreshToken);
    res.clearCookie("refreshToken");
    res.status(204).send();
};
