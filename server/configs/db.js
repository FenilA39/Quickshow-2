import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', ()=> console.log('Databse connected'));
        await mongoose.connect(`${process.env.MONGODB_URI}/quicksow`)
    } catch (error) {
        console.log(error.message);
        
    }
}

export default connectDB;