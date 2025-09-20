require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const supplierRoutes = require("./routes/supplierRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

// MongoDB connect
mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

// Swagger setup
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Supplier & Product CRUD API",
            version: "1.0.0",
            description: "API documentation for Supplier and Product management",
        },
        servers: [{ url: `http://localhost:${process.env.PORT || 3000}` }],
        components: {
            schemas: {
                Supplier: {
                    type: "object",
                    properties: {
                        _id: { type: "string", description: "Supplier ID" },
                        name: { type: "string" },
                        address: { type: "string" },
                        phone: { type: "string" }
                    },
                    required: ["name"]
                },
                Product: {
                    type: "object",
                    properties: {
                        _id: { type: "string", description: "Product ID" },
                        name: { type: "string" },
                        address: { type: "string" },
                        phone: { type: "string" },
                        supplierId: { type: "string", description: "Supplier ID" }
                    },
                    required: ["name"]
                }
            }
        }
    },
    apis: ["./routes/*.js"],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// UI Routes
app.use("/suppliers", supplierRoutes);
app.use("/products", productRoutes);

// API Routes (cho Swagger test)
app.use("/api/suppliers", supplierRoutes);
app.use("/api/products", productRoutes);

// Home
app.get("/", (req, res) => res.render("index"));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));