const express = require("express");
const mongoose = require("mongoose");
const productRouter = require("./Routes/product.route");

const app = express();
app.use(express.json());

// connect to mongodb and log on connection
mongoose
    .connect("mongodb://127.0.0.1:27017/testDB")
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) =>
        console.error("Error connecting to MongoDB:", error.message)
    );

app.use('/products', productRouter);

app.listen(5000, () => {
    console.log("Server started on port 5000");
});