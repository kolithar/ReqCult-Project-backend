import bcrypt from "bcrypt";
import { UserModel } from "../models/User.model";
import { RefreshTokenModel } from "../models/RefreshToken.model";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const SALT_ROUNDS = 10;

export const register = async (name: string, email: string, password: string, role: string) => {
    const existing = await UserModel.findOne({ email });
    if (existing) throw new Error("User already exists");
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await UserModel.create({ name, email, password: hashed, role });
    return user;
};

export const login = async (email: string, password: string) => {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("Invalid credentials");
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid credentials");

    const accessToken = signAccessToken({ sub: user._id, role: user.role });
    const refreshToken = signRefreshToken({ sub: user._id, role: user.role });

    // Save refresh token in DB (for rotation / revocation)
    const expiresAt = new Date(Date.now() + parseExpiryToMs(process.env.REFRESH_TOKEN_EXPIRES || "7d"));
    await RefreshTokenModel.create({ token: refreshToken, user: user._id, expiresAt });

    return { accessToken, refreshToken, user };
};

function parseExpiryToMs(exp: string) {
    // minimal parser: "7d" -> days, "15m" -> minutes
    const num = parseInt(exp.slice(0, -1), 10);
    const unit = exp.slice(-1);
    if (unit === "d") return num * 24 * 60 * 60 * 1000;
    if (unit === "h") return num * 60 * 60 * 1000;
    if (unit === "m") return num * 60 * 1000;
    return 7 * 24 * 60 * 60 * 1000;
}

export const refreshTokens = async (oldRefreshToken: string) => {
    // verify token and ensure it's in DB and not revoked
    try {
        const payload: any = verifyRefreshToken(oldRefreshToken);
        const dbToken = await RefreshTokenModel.findOne({ token: oldRefreshToken, revoked: false });
        if (!dbToken) throw new Error("Invalid refresh token");

        // Optionally revoke old token (rotation)
        dbToken.revoked = true;
        await dbToken.save();

        // issue new tokens
        const accessToken = signAccessToken({ sub: payload.sub, role: payload.role });
        const refreshToken = signRefreshToken({ sub: payload.sub, role: payload.role });

        const expiresAt = new Date(Date.now() + parseExpiryToMs(process.env.REFRESH_TOKEN_EXPIRES || "7d"));
        await RefreshTokenModel.create({ token: refreshToken, user: new mongoose.Types.ObjectId(payload.sub), expiresAt });

        return { accessToken, refreshToken };
    } catch (err) {
        throw new Error("Invalid refresh token");
    }
};

export const logout = async (refreshToken: string) => {
    await RefreshTokenModel.findOneAndUpdate({ token: refreshToken }, { revoked: true });
};
