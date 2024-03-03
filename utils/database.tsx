import mongoose from "mongoose";

const mongodb = "mongodb+srv://mirelkorajac:060506mK@cluster0.ld3eure.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);

    if (isConnected) {
        console.log("MongoDB is already connected");
        return;
    }

    try {
        await mongoose.connect(mongodb)

        isConnected = true;

        console.log("MongoDB connected")
    } catch (error) {
        console.log(error);
        throw new Error("Failed to connect to MongoDB");
    }
}
