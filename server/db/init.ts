import chalk from "chalk";
import mongoose from "mongoose";

type Connection = {
  isConnected?: number;
};

const connection: Connection = {};

export async function connectDb(): Promise<void> {
  if (connection.isConnected) {
    console.warn("DB is already connected!");
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    connection.isConnected = db.connections[0].readyState;
    console.log(chalk.green("DB connected successfully"));
  } catch (error) {
    console.error("Error connecting to DB:", error);
    process.exit(1);
  }
}
