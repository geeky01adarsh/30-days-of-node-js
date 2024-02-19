const express = require('express');
const mongoose = require('mongoose');


const app = express();

// connect to mongoose
mongoose.connect('mongodb://127.0.0.1:27017/testDB');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

const addUserToDatabase = async ({username, email}) => {
    try {
        const newUser = new User({ username, email });
        await newUser.save();
        console.log("User added successfully");
    } catch (error) {
        console.error("Error adding user:", error.message);
    }
};

// addUserToDatabase({ username: 'john_doe', email: 'john@example.com' })

app.get('/users', async(req, res)=>{
    const allUsers = await User.find();
    return res.status(200).json(allUsers);
})


app.listen(5000, () => {
    console.log("Server is running on port 5000");
})