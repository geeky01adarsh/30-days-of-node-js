const express = require("express");
const { LRUCache } = require("lru-cache");
const app = express();

const cacheOptions = {
    max: 500, // maximum number of items in the cache
    maxAge: 1000 * 60 * 60, // cache expiration time (1 hour in this example)
};

const cache = new LRUCache(cacheOptions);

app.use((req, res, next) => {
    const key = req.originalUrl;
    const cachedResponse = cache.get(key);
    if (cachedResponse) {
        console.log("Response from cache: " + cachedResponse);
        res.send(cachedResponse);
    } else {
        res.sendResponse = res.send;
        res.send = (body) => {
            cache.set(key, body);
            console.log("Resolved response: " + body);
            res.sendResponse(body);
        };
        next();
    }
});

app.use("/hello", (req, res) => {
    res.send("Hello World!");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
