import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from '../config/db';
import User from '../models/User';
import bcrypt from 'bcryptjs';

const run = async () => {
    await connectDB();
    const email = process.env.ADMIN_EMAIL || 'admin@juice.local';
    const existing = await User.findOne({ email });
    if (existing) {
        console.log('Admin already exists:', email);
        process.exit(0);
    }
    const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@123', 10);
    const admin = new User({ username: 'Admin', email, password: hashed, role: 'admin' });
    await admin.save();
    console.log('Admin created:', email);
    process.exit(0);
};

run().catch(err => {
    console.error(err);
    process.exit(1);
});
