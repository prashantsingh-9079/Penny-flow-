const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const expenseRoutes = require('./routes/expenseRoutes')

const app = express()

const PORT = 5000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('PennyFlow Backend is running 🚀')
})

app.use('/api/expenses', expenseRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully ✅')

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection failed ❌')
    console.error(error.message)
  })