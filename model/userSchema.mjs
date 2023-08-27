// const mongoose = require("mongoose");
import mongoose from "mongoose";

// Define a schema
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  name: String,
  email: String,
  number:String,
  createdOn: {type:Date, default:Date.now}
});
const userModel = mongoose.model("users", UserSchema);

export default userModel