import Product from "../models/product.model.js";
import mongoose from "mongoose";


export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        console.log("Error getting products: ", error);
        res.status(500).json({
            success: false,
            message: "Error getting products",
        })
    }
}
export const createProducts = async (req, res) => {
    const product = req.body;

    if (!product.title || !product.price || !product.image) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: newProduct
        });
    } catch (error) {
        console.log("Error creating product: ", error);
        res.status(500).json({
            success: false,
            message: "Error creating product",
        })
    }
}
export const updateProducts = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    console.log(id, product);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
        });
    }

    if (!product.title || !product.price || !product.image) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct
        });
    } catch (error) {
        console.log("Error updating product: ", error);
        res.status(500).json({
            success: false,
            message: "Error updating product",
        })
    }
}
export const deleteProducts = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
        });
    }

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found or already deleted.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully.",
        });
    } catch (error) {
        console.log("Error deleting product: ", error);
        res.status(500).json({
            success: false,
            message: "Error deleting product.",
        });
    }
}