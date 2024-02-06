const express = require("express")

const app = express();


app.get("/greet", (req, res) => {
    const name = req.query.name || "Guest";
    res.send(`Hello, ${name}!`);
})

app.listen(5000, () => {
    console.log("Server started on port 5000");
});