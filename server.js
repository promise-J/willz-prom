
require("dotenv").config()
const express = require('express')
const axios = require('axios')
const router = require("./routes")

const path = require("path");
const cors = require("cors");
const connectToMongoDB = require('./db/connect.js');

const port = process.env.PORT || 5000;
const mongoURL = process.env.MONGODB_URL;

const app = express()

const corsOptions = {
  origin: 'https://appser.com.ng', // Allow this specific origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // You can specify allowed methods here
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
};

// Use CORS with the specified options
app.use(cors(corsOptions));

app.use(express.json())
app.use(express.static(path.join(__dirname, "client", "dist")));

app.set('views', './views')
app.set('view engine', 'ejs')

app.use("/api", router);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});


app.listen(port, async () => {
  console.log(`Server running on ${port}`);
  await connectToMongoDB(mongoURL)
});