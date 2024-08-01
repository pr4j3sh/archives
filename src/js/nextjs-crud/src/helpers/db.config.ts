import mongoose from "mongoose";

export async function connect() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI!);
    console.log(conn);
  } catch (error) {
    console.log(error);
    process.exit();
  }
}
