import express from "express";
import cors from "cors";
import expensesRouter from "./src/routes/expenses.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/expenses", expensesRouter);

app.get("/", (req, res) => {
    res.send("Finance Manager API is running!");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
