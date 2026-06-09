import mongoose from "mongoose";

// its eqal to SQLAlmech in SQLLite act as a translator and mongoose help in setting rules in flexible unstruc
// MangoDB database by schema translator as in nodejs we use JS which store in java script nota but mango store in BSON format

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);// connecting mongoose to MongoDB
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);//it means stop server we use this cause mangodb connection is critical without this every req send error
  }
};
// we use async cause this func takes time and to make my app asynchronus try and catch cause these type of req can fail
// in async the func gets freeze not whole server like user A /login server do that after sending user b async func req it not just get stuck on that 
// and make other wait till user a is done