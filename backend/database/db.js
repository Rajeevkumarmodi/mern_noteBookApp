// mongodb+srv://rk0424067:<password>@cluster0.0n3gezo.mongodb.net/
import mongoose from "mongoose";
import { connect } from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    await connect(
      `mongodb+srv://rk0424067:${process.env.DB_PASSWORD}@cluster0.0n3gezo.mongodb.net/eNotBook`
    );
    console.log("data base is connected");
  } catch (error) {
    console.log(error);
    console.log("not cponnected");
  }
};

export default connectDB;
