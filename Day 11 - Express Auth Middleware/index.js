const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.use((req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).send("Unauthorized");
        }
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, "secret");
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send(error.message);
    }
})

app.get('/', (req, res) => {
    res.send(`Hello, ${req.user.name}!`);
})



app.listen(5000, () => {
    console.log("Server started on port 5000");
})