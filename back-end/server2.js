// Simple Server File with Libraries

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "20mb"}));

app.listen(port, () => {
    console.log(`🚀 Server is Running on Port: ${port}`)
});