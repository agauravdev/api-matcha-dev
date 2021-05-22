const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongodbConnection = process.env.MONGODB_CONFIG;
    if (mongodbConnection) {
      await mongoose.connect(mongodbConnection, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
      console.log('Database Connected');
    } else {
      console.warn('Skipping database connection, no connection string defined');
    }
  } catch (err) {
    console.error('Error Connecting database');
  }
};

module.exports = connectDB;