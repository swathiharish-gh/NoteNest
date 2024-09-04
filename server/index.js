// index.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoute'); 
const noteRoutes = require('./routes/notesRoute');

const app = express();
const PORT = 3000;

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connection successful"))
    .catch((error) => console.log("MongoDB connection error:", error));

app.get("/", (req, res) => {
    res.send("Server is running...");
});

app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);
app.use("/files", express.static("files"));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
