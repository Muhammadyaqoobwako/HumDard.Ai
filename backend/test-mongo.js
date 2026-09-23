import dotenv from "dotenv";
import mongoose from "mongoose";
import dns from "node:dns";

dotenv.config();
dns.setServers(["8.8.8.8", "1.1.1.1"]);

console.log("MONGODB_URI loaded:", !!process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => {
    console.log("MONGOOSE CONNECTED");
    process.exit(0);
  })
  .catch((err) => {
    console.error("MONGOOSE FAILED");
    console.error(err);
    process.exit(1);
  });
