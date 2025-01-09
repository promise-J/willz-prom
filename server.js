
require("dotenv").config()
const express = require('express')
const fs = require('fs')
const router = require("./routes")

const path = require("path");
const cors = require("cors");
const connectToMongoDB = require('./db/connect.js')

const port = process.env.PORT || 5000;
const mongoURL = process.env.MONGODB_URL

const app = express()
// https://api.rechargeapps.com
//  https://api.mobilevtu.com/v1/‹API Key›/‹resource URI›



app.use(cors())

app.use(express.json())
app.use(express.static(path.join(__dirname, "client", "dist")));

app.use("/api", router);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(port, async () => {
  console.log(`Server running on port and DB connected ${port}`);
  await connectToMongoDB(mongoURL)
});