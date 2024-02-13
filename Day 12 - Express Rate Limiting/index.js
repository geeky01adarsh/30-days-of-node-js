const express = require("express");
const rateLimit = require("express-rate-limit");
const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

app.use(limiter);

app.get("/", (req, res) => {
    res.status(200).json("Hello, World!");
})

app.listen(5000, () => {
    console.log("Server started on port 5000");
})
