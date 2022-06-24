const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;
const apiRouter = require("./routes/apis");

app.use(logger("dev"));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

mongoose.connect("mongodb://localhost:27017/BlogManangement")
    .then(res => console.log(`Mongoose conncted to db successfully ${res}`))
    .catch(err => console.log('Mongoose connection to db is get failed. Try again'));

app.use("/api", apiRouter);

console.log("let's build the world !");

app.listen(PORT, () => {
    console.log(`Server is connected at adreess ${PORT}`);
})