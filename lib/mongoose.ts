import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    if(isConnected){
        console.log("Already connected to MongoDB");
        return;
    }
    try{
        await mongoose.connect(process.env.MONGODB_URL!, {
            dbName: "TrackAI",
            bufferCommands: false, 
        })

        isConnected = true;
        console.log("Connected to MongoDB");
    }catch(error){
        console.error("MongoDB connection error: ", error);
    }
}