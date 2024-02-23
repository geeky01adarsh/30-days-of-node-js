const Product = require("../Model/products.model");
const Category = require("../Model/category.model");

/**
 * Creates a new product in MongoDB
 * @param {Object} product - Product object with properties name, price, and quantity
 */
async function createProduct(req, res) {
    // get name, price and quantity from product and store it in database
    try {
        const { name, price, quantity, category } = req.body;
        const newProduct = new Product({
            name,
            price,
            quantity,
            category,
        });
        await newProduct.save();
        // check if the category exists then push the product id in the db
        const categoryRecord = await Product.findOne({ category });

        if (categoryRecord.length) {
            categoryRecord.products.push(newProduct._id);
            await categoryRecord.save();
        } else {
            const newCategory = new Category({
                category,
                products: [newProduct._id],
            });
            await newCategory.save();
        }

        return res.status(201).json({
            status: "success",
            message: "Product created successfully",
        });
    } catch (error) {
        console.error("Error creating product:", error.message);
        return res
            .status(500)
            .json({ status: "error", message: "Error creating product" });
    }
}

/**
 * Retrieves all products from MongoDB
 * @returns {Array} - Array of product objects
 */
async function getAllProducts(req, res) {
    try {
        const allProducts = await Product.find();
        if (!allProducts)
            return res.status(404).json({
                status: "error",
                message: "No products found",
            });
        return res.status(200).json({ status: "success", data: allProducts });
    } catch (error) {
        console.error("Error retrieving products:", error.message);
        return res
            .status(500)
            .json({ status: "error", message: "Error retrieving products" });
    }
}

/**
 * Updates a product in MongoDB
 * @param {string} productId - ID of the product to update
 * @param {Object} updatedProduct - Updated product object
 */
async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const { name, price, quantity } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(id, {
            name,
            price,
            quantity,
        });

        if (!updatedProduct)
            return res.status(404).json({
                status: "error",
                message: "Product not found",
            });

        return res.status(200).json({
            status: "success",
            message: "Product updated successfully",
            data: updatedProduct,
        });
    } catch (error) {
        console.error("Error updating product:", error.message);
        return res
            .status(500)
            .json({ status: "error", message: "Error updating product" });
    }
}

/**
 * Deletes a product from MongoDB
 * @param {string} productId - ID of the product to delete
 */
async function deleteProduct(req, res) {
    // Your implementation here
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct)
            return res.status(404).json({
                status: "error",
                message: "Product not found",
            });
        return res.status(200).json({
            status: "success",
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting product:", error.message);
        return res.status(500).json({
            status: "error",
            message: "Error deleting product",
        });
    }
}

/**
 * Find a product from MongoDB
 * @param {string} productId - ID of the product to find
 */
async function findProductById(req, res) {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product)
            return res.status(404).json({
                status: "error",
                message: "Product not found",
            });
        return res.status(200).json({
            status: "success",
            data: product,
        });
    } catch (error) {
        console.error("Error finding product:", error.message);
        return res.status(500).json({
            status: "error",
            message: "Error finding product",
        });
    }
}

async function getProductsByCategory(req, res) {
    try {
        const { category } = req.params;
        const products = await Product.find({ category });
        return res.status(200).json({
            status: "success",
            data: { category, products },
        });
    } catch (error) {
        console.error("Error finding products:", error.message);
        return res.status(500).json({
            status: "error",
            message: "Error finding products",
        });
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    findProductById,
    getProductsByCategory,
};
