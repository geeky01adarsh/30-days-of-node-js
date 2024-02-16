const express = require("express");
const app = express();
const PORT = 5000;

app.use("/*", loggingMiddleware);

function loggingMiddleware(req, res, next) {
    // HTTP method, URL, headers, and body
    console.log("timestap", Date.now());
    console.log("method", req.method);
    console.log("url", req.url);
    console.log("headers", req.headers);
    console.log("body", req.body);
    next();
}

app.get("/hello", (req, res) => {
    return res.status(200).json({ message: "Request was logged" });
});

app.listen(PORT, () => {
    console.log("Server is running on PORT " + PORT);
});
