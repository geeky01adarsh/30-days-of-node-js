const express = require("express")

const app = express();
app.use(express.static("public"));

app.get("/*", (req, res) => {
    console.log("URL:", req.url);
    res.sendFile(__dirname + "/public/" + req.url);
})

const PORT =  process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log();
})