import mongoose from "mongoose";


export async function connectDB(){
    try {
        const mongoUrl = process.env.mongo_url;
        if (!mongoUrl) {
            throw new Error("MongoDB connection string (mongo_url) is not defined in environment variables.");
        }
        await mongoose.connect(mongoUrl);
        
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("MongoDB connection successful");
        });
        connection.on("error",(err)=>{
            console.log("MongoDB connection error.Please make Sure MongoDB is running ."+err);
            process.exit();
        })
    }catch (error) {
        console.log("Something went wrong while connecting to the database", error);
        console.log(error);
        
    }
}

