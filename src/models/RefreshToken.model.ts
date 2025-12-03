import mongoose, { Document, Schema } from "mongoose";

export interface IRefreshToken extends Document {
    token: string;
    user: mongoose.Types.ObjectId;
    expiresAt: Date;
    revoked?: boolean;
    createdAt: Date;
}

const RefreshTokenSchema = new Schema<IRefreshToken>(
    {
        token: { type: String, required: true, unique: true },
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        expiresAt: { type: Date, required: true },
        revoked: { type: Boolean, default: false }
    },
    { timestamps: true }
);

export const RefreshTokenModel = mongoose.model<IRefreshToken>("RefreshToken", RefreshTokenSchema);
