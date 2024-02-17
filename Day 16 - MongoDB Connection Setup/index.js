const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB
async function connectToDatabase() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect('mongodb://127.0.0.1:27017/testDB');
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

// Call the function to establish a connection
connectToDatabase();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
