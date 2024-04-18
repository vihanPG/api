const mongoose = require('mongoose');
const url = "mongodb+srv://satyaprakashsinghkasia:yVCqFHLJIAwbMqHT@cluster0.o4esf7u.mongodb.net/?retryWrites=true&w=majority";
const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Successfully connected to the database');
  } catch (error) {
    console.error(error);
  }
};
module.exports = connectDB;