const mongoose = require("mongoose");

async function connectToDatabase() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/testDB");
        console.log("Connected to MongoDB");
        return true;
    } catch (err) {
        console.error("Error connecting to MongoDB:", err.message);
        throw err;
    }
}

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
});

const Product = mongoose.model("ProductIndexModel", productSchema);

/**
 * Creates an index on the "name" field of the "Product" collection in MongoDB
 */
async function createProductNameIndex() {
    try {
        await connectToDatabase();
        const indexOptions = {
            name: "name",
            background: true,
        };
        await productSchema.index({ name: 1 }, indexOptions);
        const indexes = await Product.schema.indexes();
        console.log(indexes);
        console.log("index created successfully");
    } catch (error) {
        console.error("Error creating index:", error.message);
    }
}

createProductNameIndex();