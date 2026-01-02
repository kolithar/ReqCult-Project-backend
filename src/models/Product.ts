import mongoose, { Document, Schema } from 'mongoose';


export interface IProduct extends Document {
    category: 'juice' | 'cocktail' | 'custom';
    image: string;
    name: string;
    description: string;
    ingredients: string[];
    alcoholBrands?: string[];
    isFamous?: boolean;
    price?: number;
    createdAt: Date;
    updatedAt: Date;
}


const ProductSchema = new Schema<IProduct>({
    category: { type: String, enum: ['juice','cocktail','custom'], required: true },
    image: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    ingredients: { type: [String], default: [] },
    alcoholBrands: { type: [String], default: [] },
    isFamous: { type: Boolean, default: false },
    price: { type: Number, min: 0 }
}, { timestamps: true });


export default mongoose.model<IProduct>('Product', ProductSchema);