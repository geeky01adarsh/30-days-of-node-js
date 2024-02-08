// Create an Express route that throws an error if the request parameter "number" is not a positive integer. Implement an error handling middleware to catch and handle this specific error, returning a custom error message and a 400 Bad Request status.

const express = require("express")

const app = express()

app.use((req, res, next) => {
    try {
        const number = parseInt(req.query.number);
        if (number <= 0) {
            throw new Error("Number must be greater than 0");
        }
        next();
    } catch (error) {
        res.status(400).send(error.message);
    }
})

app.get("/positive", (req, res) => {
    const number = parseInt(req.query.number);
    res.send(`The no. ${number} is positive.`);
})

app.listen(5000, () => {
    console.log("Server started on port 5000");
})
