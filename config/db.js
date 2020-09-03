const mongoose = require("mongoose");

const connectDB = async function () {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");
  } catch (err) {
    console.log(`MongoDB not connected because of ${err.message}`);
  }
};

module.exports = { connectDB };
