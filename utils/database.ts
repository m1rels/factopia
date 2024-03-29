import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);

    if (isConnected) {
        console.log("MongoDB is already connected");
        return true;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI!, {
            dbName: "share_funfact"
        });

        isConnected = true;

        console.log("MongoDB connected")
        return true;
    } catch (error) {
        console.log(error);
    }
}
