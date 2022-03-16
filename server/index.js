const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./routes/auth");
const imageRoute = require("./routes/image");

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connected Successfully!"))
    .catch((err) => {
        console.log(err)
    });

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/contributor", imageRoute);

app.listen(process.env.PORT || 4000, () => {
    console.log("Backend server is running!")
})