const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb+srv://vishwas:n1bwcIvgjc6vnlKb@cluster0.bd9sxd4.mongodb.net/imageupload?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

module.exports = connectToDatabase;
