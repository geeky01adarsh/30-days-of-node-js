const express = require("express")

const app = express();
app.use(express.static("public"));

app.get("/*", (req, res) => {
    console.log("URL:", req.url);
    res.sendFile(__dirname + "/public/" + req.url);
})

app.listen(5000, () => {
    console.log("Server started on port 5000");
})