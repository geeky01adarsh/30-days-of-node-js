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

// schema for products storing name, price and quantity
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    category: String,
});

const productModel = mongoose.model("Product", productSchema);

// function to add products to database
async function addProducts(name, price, quantity, category) {
    try {
        const newProduct = new productModel({
            name,
            price,
            quantity,
            category,
        });
        await newProduct.save();
        console.log(`${name} added successfully`);
        return true;
    } catch (err) {
        console.error("Error connecting to MongoDB:", err.message);
        return false;
    }
}

// get product stats 
async function getProductStats() {
    try {
        const pipeline = [
            {
                $group: {
                    totalProducts: { $sum: "$quantity" },
                    averagePrice: { $avg: "$price" },
                    highestQuantity: { $max: "$quantity" },

                }
            }
        ]
        const result = await productModel.aggregate(pipeline);
        console.log("Aggregated results are: ")
        console.log(result);
    }
    catch(err){
        console.log("Error getting product stats: ", err.message);
    }
}


async function main() {
    await connectToDatabase();
    await Promise.all([
        addProducts("MacBook", 100000, 10, "laptop"),
        addProducts("iPhone 14", 50000, 5, "mobile"),
        addProducts("iPad", 20000, 20, "tablet"),
        addProducts("Samsung Galaxy", 25000, 20, "mobile"),
        addProducts("Xiaomi", 21000, 20, "tablet"),
        addProducts("Asus Vivobook", 151200, 20, "laptop"),
        addProducts("Dell", 24500, 20, "laptop"),
        addProducts("HP", 26500, 20, "laptop"),
        addProducts("Lenovo", 25500, 20, "laptop"),
    ]);
    await getProductStats();
}

main();