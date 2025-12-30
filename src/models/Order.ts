import mongoose, { Document, Schema } from 'mongoose';


export interface IOrder extends Document {
    userId: mongoose.Types.ObjectId;
    productId: mongoose.Types.ObjectId;
    category: string;
    selectedAlcohol?: string;
    totalAmount: number;
    paymentStatus: 'success' | 'failed' | 'pending';
    transactionId?: string;
    createdAt: Date;
    updatedAt: Date;
}


const OrderSchema = new Schema<IOrder>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    category: { type: String, required: true },
    selectedAlcohol: { type: String,default: null },
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['success','failed','pending'], default: 'pending' },
    transactionId: { type: String }
}, { timestamps: true });


export default mongoose.model<IOrder>('Order', OrderSchema);