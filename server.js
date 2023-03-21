const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");

dotenv.config();
mongoose.set("strictQuery", false);

const { MONGO_URL, PORT } = process.env;

const start = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

start();