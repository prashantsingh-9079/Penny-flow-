const express = require('express')
const Expense = require('../models/expense')

const router = express.Router()

// GET all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 })
    res.json(expenses)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// POST a new expense
router.post('/', async (req, res) => {
  try {
    const expense = new Expense(req.body)
    const savedExpense = await expense.save()

    res.status(201).json(savedExpense)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router