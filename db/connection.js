import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.error("❌ MongoDB connection error:");

        if (error.code === 'ECONNREFUSED' || error.message.includes('ECONNREFUSED')) {
            console.error("👉 This usually means your IP address is NOT whitelisted in MongoDB Atlas.");
            console.error("   Go to 'Network Access' in Atlas and add your current IP.");
        } else if (error.message.includes('Authentication failed')) {
            console.error("👉 Check your MONGO_URI. Your password might be incorrect.");
        }

        console.error("Original Error:", error.message);

        console.log("---------------------------------------------------------");
        console.log("⚠️  Server is still running, but Database features will fail.");
        console.log("   Once you whitelist your IP, the server will connect.");
        console.log("---------------------------------------------------------");
    }
};