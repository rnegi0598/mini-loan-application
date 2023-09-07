const mongoose = require("mongoose");
const DB_URL ="mongodb://localhost:27017";
const dbConnect = async () => {
  try {
    await mongoose.connect(DB_URL, {
      dbName: "mini-loan-app",
    });
    console.log("db connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = dbConnect;
