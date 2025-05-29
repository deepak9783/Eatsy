// // mongopassword = YvzT7bh1Aj7f5fWk
// // username = dm967236

import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log('mongoDB connected.');
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;


