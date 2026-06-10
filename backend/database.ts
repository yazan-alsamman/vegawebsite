import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/vegacore";

export async function connectDatabase() {
  mongoose.set("strictQuery", true);
  await mongoose.connect(MONGODB_URI);
  console.log("MongoDB connected:", mongoose.connection.name);
}

export async function disconnectDatabase() {
  await mongoose.disconnect();
}
