import mongoose, { Document, Schema } from "mongoose";

export type Role = "admin" | "farmer" | "merchant";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: Role;
    createdAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["admin", "farmer", "merchant"], default: "farmer" }
    },
    { timestamps: true }
);

export const UserModel = mongoose.model<IUser>("User", UserSchema);
