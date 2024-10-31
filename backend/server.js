import express from "express";

import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.routes.js";

const port = process.env.PORT || 5000;

dotenv.config();
const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use("/api/products", productRoutes);  

app.listen(port, () => {
    connectDB();
    console.log("Backend server is running at http://localhost:" + port + "/api/products !My favorite number is 42!");
});