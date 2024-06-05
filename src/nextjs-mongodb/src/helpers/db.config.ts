import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = await mongoose.connection;
    connection.on("connected", () => {
      console.log("[+] database connected");
    });
    connection.on("error", (error) => {
      console.log("[!] database error: ", error);
      process.exit();
    });
  } catch (error) {
    console.log("[!] database error: ", error);
  }
}
