import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://lluizggustavo:kamicase123@cluster0.xv8wswq.mongodb.net/alura-node"
);

const db = mongoose.connection;

export default db;
