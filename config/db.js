import mongoose from "mongoose";

async function ConnectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("env", process.env.MONGO_URI);

    console.log("Db Connected");
  } catch (error) {
    throw new Error(error.message);
  }
}

export default ConnectDB;
