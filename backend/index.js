const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors')

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());

// Database

main().catch(err => {
  console.error("Error during startup:", err);
});

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
