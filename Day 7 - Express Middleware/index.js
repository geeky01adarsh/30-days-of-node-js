const express = require("express")

const app = express();

app.use((req, res, next) => {
    console.log("Timestamp:", Date.now());
    console.log("HTTP Method:", req.method);
    next();
});

app.get("/greet", (req, res) => {
    const name = req.query.name || "Guest";
    res.send(`Hello, ${name}!`);
})

app.listen(5000, () => {
    console.log("Server started on port 5000");
})
