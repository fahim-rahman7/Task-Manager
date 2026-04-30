const mongoose = require("mongoose");

const dbConfig = async () => {
  try {
    await mongoose.connect(process.env.Db_URL);
    console.log("DB Connected!");
  } catch (error) {
    console.log("DB Error:", error.message);
  }
};

module.exports = dbConfig;