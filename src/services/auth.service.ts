import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/tokens';
import * as userRepo from '../repositories/user.repository';
import { IUser } from '../models/User';

export const signupService = async (username: string, email: string, password: string) => {
    const existing = await userRepo.findUserByEmail(email);
    if (existing) throw new Error('Email already in use');
    const hashed = await bcrypt.hash(password, 10);
    const user = await userRepo.createUser({ username, email, password: hashed, role: 'user' } as Partial<IUser>);
    return user;
};

export const loginService = async (email: string, password: string) => {
    const user = await userRepo.findUserByEmail(email);
    if (!user) throw new Error('Invalid credentials');
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Invalid credentials');

    const payload = { id: user._id.toString(), role: user.role, email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return { accessToken, refreshToken, user: { id: user._id, email: user.email, role: user.role, username: user.username } };
};

export const refreshService = async (token: string) => {
    const payload: any = verifyRefreshToken(token) as any;
    const newAccess = generateAccessToken({ id: payload.id, role: payload.role, email: payload.email });
    return newAccess;
};
