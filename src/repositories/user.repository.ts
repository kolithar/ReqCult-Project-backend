import User, { IUser } from '../models/User';
import mongoose from 'mongoose';

export const createUser = async (payload: Partial<IUser>) => {
    return User.create(payload);
};

export const findUserByEmail = async (email: string) => {
    return User.findOne({ email });
};

export const findUserById = async (id: string | mongoose.Types.ObjectId) => {
    return User.findById(id);
};
