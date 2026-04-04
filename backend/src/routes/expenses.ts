import { Router, Request, Response } from "express";
import { MOCK_EXPENSES, Expense } from "../data/mockData.js";

const router = Router();

// GET /api/expenses - Fetch all expenses
router.get("/", (req: Request, res: Response) => {
  res.json(MOCK_EXPENSES);
});

// POST /api/expenses - Add a new expense
router.post("/", (req: Request, res: Response) => {
  try {
    const newExpense: Expense = {
      id: `e${Date.now()}`, // Generate unique ID using timestamp
      title: req.body.title,
      amount: req.body.amount,
      category: req.body.category,
      mode: req.body.mode,
      date: req.body.date || new Date().toISOString().split("T")[0],
    };

    // Validate required fields
    if (!newExpense.title || !newExpense.amount || !newExpense.category || !newExpense.mode) {
      res.status(400).json({ error: "Missing required fields: title, amount, category, mode" });
      return;
    }

    MOCK_EXPENSES.unshift(newExpense);
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: "Failed to add expense" });
  }
});

// DELETE /api/expenses/:id - Delete an expense
router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const initialLength = MOCK_EXPENSES.length;
  const filteredExpenses = MOCK_EXPENSES.filter((e) => e.id !== id);

  if (filteredExpenses.length === initialLength) {
    res.status(404).json({ error: "Expense not found" });
    return;
  }

  // Update the MOCK_EXPENSES array
  MOCK_EXPENSES.length = 0;
  MOCK_EXPENSES.push(...filteredExpenses);

  res.json({ message: "Expense deleted successfully" });
});

export default router;
