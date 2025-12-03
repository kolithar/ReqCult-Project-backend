import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ message: "No token" });

        const token = authHeader.split(" ")[1];
        const payload = verifyAccessToken(token) as any;
        // attach to request
        (req as any).user = { id: payload.sub, role: payload.role };
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
