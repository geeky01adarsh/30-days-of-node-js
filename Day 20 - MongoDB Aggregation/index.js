const express = require("express");
const mongoose = require("mongoose");
const User = require("./UserModel");
const app = express();

// connect to mongodb and log on connection
mongoose
    .connect("mongodb://127.0.0.1:27017/testDB")
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) =>
        console.error("Error connecting to MongoDB:", error.message)
    );

app.get("/average-age", async (req, res) => {
    try {
        const averageAge = await User.aggregate([
            {
                $group: {
                    _id: null,
                    averageAge: { $avg: "$age" },
                },
            },
        ]);
        res.json({ averageAge: Math.round(averageAge[0].averageAge) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get("/add-user", async (req, res) => {
    try {
        const user = new User({
            username: "john_doe",
            email: "john@example.com",
            age: Math.round(Math.random() * 100),
        });
        await user.save();
        res.json({ message: "User added successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(5000, () => {
    console.log("Server started on port 5000");
});
