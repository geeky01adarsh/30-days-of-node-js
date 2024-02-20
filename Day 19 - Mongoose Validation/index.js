const mongoose = require("mongoose");
// connect to mongoose
mongoose.connect("mongodb://127.0.0.1:27017/testDB");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
              return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email id!`
          },
          required: [true, 'User email id required']
    },
});


const User = mongoose.model("User", userSchema);

const addUserToDatabase = async ({ username, email }) => {
    try {
        const newUser = new User({ username, email });
        await newUser.save();
        console.log("User added successfully");
    } catch (error) {
        console.error("Error adding user:", error.message);
    }
};

console.log("With email id: example.com");
addUserToDatabase({ username: "john_doe", email: "example.com" });

console.log("With email id: john@example");
addUserToDatabase({ username: "geeky01adarsh", email: "adarsh@example.com" });
