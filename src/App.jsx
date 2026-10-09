import { useState, useEffect } from 'react'
import './App.css'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

function App() {
  const [activePage, setActivePage] = useState('Dashboard')

  const [showExpenseForm, setShowExpenseForm] = useState(false)
  const [expenseAmount, setExpenseAmount] = useState('')
  const [expenseCategory, setExpenseCategory] = useState('Food')
  const [expenseDescription, setExpenseDescription] = useState('')
  const [showIncomeForm, setShowIncomeForm] = useState(false)
  const [incomeAmount, setIncomeAmount] = useState('')
  const [incomeSource, setIncomeSource] = useState('Pocket Money')
  const [incomeDescription, setIncomeDescription] = useState('')
  const [savings, setSavings] = useState(0)
  const [savingsTarget, setSavingsTarget] = useState(10000)
  const [goalName, setGoalName] = useState('')
  const [goalTarget, setGoalTarget] = useState(0)
  const [goalSaved, setGoalSaved] = useState(0)
  const [budgetCategory, setBudgetCategory] = useState('Food')
  const [budgetLimit, setBudgetLimit] = useState(0)
const [budgets, setBudgets] = useState([])
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      title: 'College Canteen',
      category: 'Food',
      date: 'Today',
      amount: -80,
    },
    {
      id: 2,
      title: 'Monthly Pocket Money',
      category: 'Income',
      date: 'Today',
      amount: 2000,
    },
    {
      id: 3,
      title: 'Netflix',
      category: 'Entertainment',
      date: 'Yesterday',
      amount: -199,
    },
  ])

  const income = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((total, transaction) => total + transaction.amount, 0)
  useEffect(() => {
  const savedTransactions = localStorage.getItem('pennyflow_transactions')

  if (savedTransactions) {
    setTransactions(JSON.parse(savedTransactions))
  }
}, [])
  const expenses = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((total, transaction) => total + Math.abs(transaction.amount), 0)
  useEffect(() => {
  localStorage.setItem(
    'pennyflow_transactions',
    JSON.stringify(transactions)
   )
  }, [transactions])
  const balance = income - expenses

  const handleAddExpense = (e) => {
    e.preventDefault()

    if (!expenseAmount || !expenseDescription) {
      alert('Please fill all fields')
      return
    }

    const newExpense = {
      id: Date.now(),
      title: expenseDescription,
      category: expenseCategory,
      date: 'Today',
      amount: -Number(expenseAmount),
    }

    setTransactions([newExpense, ...transactions])

    setExpenseAmount('')
    setExpenseDescription('')
    setExpenseCategory('Food')
    setShowExpenseForm(false)
  }
    const handleAddIncome = (e) => {
  e.preventDefault()

  if (!incomeAmount || !incomeDescription) {
    alert('Please fill all fields')
    return
  }

  const newIncome = {
    id: Date.now(),
    title: incomeDescription,
    category: incomeSource,
    date: 'Today',
    amount: Number(incomeAmount),
  }

  setTransactions([newIncome, ...transactions])

  setIncomeAmount('')
  setIncomeSource('Pocket Money')
  setIncomeDescription('')
  setShowIncomeForm(false)
}
useEffect(() => {
  const savedSavings = localStorage.getItem('pennyflow_savings')
  const savedSavingsTarget = localStorage.getItem('pennyflow_savings_target')

  if (savedSavings) {
    setSavings(Number(savedSavings))
  }

  if (savedSavingsTarget) {
    setSavingsTarget(Number(savedSavingsTarget))
  }
}, [])
const handleUpdateSavings = (e) => {
  e.preventDefault()

  const amount = Number(e.target.amount.value)
  const target = Number(e.target.target.value)

  if (!amount || !target) {
    alert('Please enter valid amounts')
    return
  }

  setSavings(amount)
  setSavingsTarget(target)
}
useEffect(() => {
  localStorage.setItem('pennyflow_savings', savings)
  localStorage.setItem('pennyflow_savings_target', savingsTarget)
}, [savings, savingsTarget])
useEffect(() => {
  const savedGoalName = localStorage.getItem('pennyflow_goal_name')
  const savedGoalTarget = localStorage.getItem('pennyflow_goal_target')
  const savedGoalSaved = localStorage.getItem('pennyflow_goal_saved')

  if (savedGoalName) {
    setGoalName(savedGoalName)
  }

  if (savedGoalTarget) {
    setGoalTarget(Number(savedGoalTarget))
  }

  if (savedGoalSaved) {
    setGoalSaved(Number(savedGoalSaved))
  }
}, [])
  const handleSaveGoal = (e) => {
  e.preventDefault()

  if (!goalName || !goalTarget || !goalSaved) {
    alert('Please fill all fields')
    return
  }

  setGoalName(goalName)
  setGoalTarget(Number(goalTarget))
  setGoalSaved(Number(goalSaved))
}
useEffect(() => {
  localStorage.setItem('pennyflow_goal_name', goalName)
  localStorage.setItem('pennyflow_goal_target', goalTarget)
  localStorage.setItem('pennyflow_goal_saved', goalSaved)
}, [goalName, goalTarget, goalSaved])
const handleSaveBudget = (e) => {
  e.preventDefault()

  if (!budgetLimit) {
    alert('Please enter a budget limit')
    return
  }

  const newBudget = {
    id: Date.now(),
    category: budgetCategory,
    limit: Number(budgetLimit)
  }

  setBudgets([...budgets, newBudget])
  setBudgetLimit(0)
}
useEffect(() => {
  const savedBudgets = localStorage.getItem('pennyflow_budgets')

  if (savedBudgets) {
    setBudgets(JSON.parse(savedBudgets))
  }
}, [])

useEffect(() => {
  localStorage.setItem(
    'pennyflow_budgets',
    JSON.stringify(budgets)
  )
}, [budgets])
  return (
    <div>
      {/* Sidebar */}
      <aside>
        <h2>PennyFlow</h2>

        <nav>
          <button
            type="button"
            onClick={() => setActivePage('Dashboard')}
          >
            Dashboard
          </button>

          <button
            type="button"
            onClick={() => setActivePage('Expenses')}
          >
            Expenses
          </button>

          <button
            type="button"
            onClick={() => setActivePage('Income')}
          >
            Income
          </button>

          <button
            type="button"
            onClick={() => setActivePage('Savings')}
          >
            Savings
          </button>

          <button
            type="button"
            onClick={() => setActivePage('Goals')}
          >
            Goals
          </button>

          <button
            type="button"
            onClick={() => setActivePage('Budgets')}
          >
            Budgets
          </button>

          <button
            type="button"
            onClick={() => setActivePage('Insights')}
          >
            Insights
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main>
        

        {/* DASHBOARD */}
        {activePage === 'Dashboard' && (
          <>
            <h1>Dashboard</h1>
            <p>Welcome back 👋</p>

            <section>
              <div>
                <h3>Balance</h3>
                <p>₹{balance}</p>
              </div>

              <div>
                <h3>Income</h3>
                <p>₹{income}</p>
              </div>

              <div>
                <h3>Expenses</h3>
                <p>₹{expenses}</p>
              </div>

              <div>
                <h3>Savings</h3>
                <p>₹{savings}</p>
              </div>
            </section>

            <section className="transactions">
              <h2>Recent Transactions</h2>

              {transactions.map((transaction) => (
                <div
                  className="transaction"
                  key={transaction.id}
                >
                  <div>
                    <strong>{transaction.title}</strong>

                    <p>
                      {transaction.category} • {transaction.date}
                    </p>
                  </div>

                  <span>
                    {transaction.amount > 0 ? '+' : '-'} ₹
                    {Math.abs(transaction.amount)}
                  </span>
                </div>
              ))}
            </section>
          </>
        )}

        {/* EXPENSES */}
        {activePage === 'Expenses' && (
          <>
            <h1>Expenses</h1>
            <p>Track where your money is going.</p>

            <div className="page-box">
              <button
                type="button"
                onClick={() =>
                  setShowExpenseForm(!showExpenseForm)
                }
              >
                {showExpenseForm
                  ? 'Close'
                  : 'Add Expense'}
              </button>

              {showExpenseForm && (
                <form onSubmit={handleAddExpense}>

                  <div>
                    <label>Amount</label>

                    <input
                      type="number"
                      placeholder="Enter amount"
                      value={expenseAmount}
                      onChange={(e) =>
                        setExpenseAmount(e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label>Category</label>

                    <select
                      value={expenseCategory}
                      onChange={(e) =>
                        setExpenseCategory(e.target.value)
                      }
                    >
                      <option>Food</option>
                      <option>Entertainment</option>
                      <option>Travel</option>
                      <option>Shopping</option>
                      <option>Education</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label>Description</label>

                    <input
                      type="text"
                      placeholder="What did you spend on?"
                      value={expenseDescription}
                      onChange={(e) =>
                        setExpenseDescription(e.target.value)
                      }
                    />
                  </div>

                  <button type="submit">
                    Save Expense
                  </button>
                </form>
              )}
            </div>

            <section className="transactions">
              <h2>All Expenses</h2>

              {transactions
                .filter(
                  (transaction) =>
                    transaction.amount < 0
                )
                .map((transaction) => (
                  <div
                    className="transaction"
                    key={transaction.id}
                  >
                    <div>
                      <strong>
                        {transaction.title}
                      </strong>

                      <p>
                        {transaction.category} •{' '}
                        {transaction.date}
                      </p>
                    </div>

                    <span>
                      - ₹
                      {Math.abs(
                        transaction.amount
                      )}
                    </span>
                  </div>
                ))}
            </section>
          </>
        )}

        {/* INCOME */}
        {activePage === 'Income' && (
  <>
    <h1>Income</h1>
    <p>Manage your income sources.</p>

    <div className="page-box">

      <button
        type="button"
        onClick={() => setShowIncomeForm(!showIncomeForm)}
      >
        {showIncomeForm ? 'Close' : 'Add Income'}
      </button>

      {showIncomeForm && (
        <form onSubmit={handleAddIncome}>

          <div>
            <label>Amount</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={incomeAmount}
              onChange={(e) => setIncomeAmount(e.target.value)}
            />
          </div>

          <div>
            <label>Source</label>
            <select
              value={incomeSource}
              onChange={(e) => setIncomeSource(e.target.value)}
            >
              <option>Pocket Money</option>
              <option>Salary</option>
              <option>Freelance</option>
              <option>Scholarship</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label>Description</label>
            <input
              type="text"
              placeholder="Where did the money come from?"
              value={incomeDescription}
              onChange={(e) => setIncomeDescription(e.target.value)}
            />
          </div>

          <button type="submit">
            Save Income
          </button>

        </form>
      )}

      <h2>Total Income: ₹{income}</h2>

    </div>

    <section className="transactions">
      <h2>All Income</h2>

      {transactions
        .filter((transaction) => transaction.amount > 0)
        .map((transaction) => (
          <div
            className="transaction"
            key={transaction.id}
          >
            <div>
              <strong>{transaction.title}</strong>
              <p>
                {transaction.category} • {transaction.date}
              </p>
            </div>

            <span>
              + ₹{transaction.amount}
            </span>
          </div>
        ))}
    </section>
  </>
)}

        {/* OTHER PAGES */}
        {activePage === 'Savings' && (
  <>
    <h1>Savings</h1>
    <p>Track your savings progress.</p>

    <div className="page-box">
      <h2>
        ₹{savings} / ₹{savingsTarget}
      </h2>

      <p>
        {Math.min(
          Math.round((savings / savingsTarget) * 100),
          100
        )}% of your goal
      </p>

      <form onSubmit={handleUpdateSavings}>
        <div>
          <label>Current Savings</label>
          <input
            name="amount"
            type="number"
            placeholder="Enter savings"
            defaultValue={savings}
          />
        </div>

        <div>
          <label>Savings Target</label>
          <input
            name="target"
            type="number"
            placeholder="Enter target"
            defaultValue={savingsTarget}
          />
        </div>

        <button type="submit">
          Update Savings
        </button>
      </form>
    </div>
  </>
)}
        {activePage === 'Goals' && (
  <>
    <h1>Goals</h1>
    <p>Set and track your financial goals.</p>

    <div className="page-box">
      <form onSubmit={handleSaveGoal}>

        <div>
          <label>Goal Name</label>
          <input
            type="text"
            placeholder="e.g. New Laptop"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
          />
        </div>

        <div>
          <label>Target Amount</label>
          <input
            type="number"
            placeholder="Enter target amount"
            value={goalTarget}
            onChange={(e) => setGoalTarget(e.target.value)}
          />
        </div>

        <div>
          <label>Amount Saved</label>
          <input
            type="number"
            placeholder="Enter saved amount"
            value={goalSaved}
            onChange={(e) => setGoalSaved(e.target.value)}
          />
        </div>

        <button type="submit">
          Save Goal
        </button>

      </form>
    </div>

    {goalName && (
      <section className="transactions">
        <h2>{goalName}</h2>

        <p>
          ₹{goalSaved} / ₹{goalTarget}
        </p>

        <p>
          {Math.min(
            Math.round((goalSaved / goalTarget) * 100),
            100
          )}% completed
          <div className="goal-progress">
          <div
            className="goal-progress-bar"
            style={{
            width: `${Math.min(
              (goalSaved / goalTarget) * 100,
              100
           )}%`,
          }}
        ></div>
      </div>
        </p>
      </section>
    )}
  </>
)}

        {activePage === 'Budgets' && (
          <>
            <h1>Budgets</h1>
            <div className="page-box">

  <form onSubmit={handleSaveBudget}>

    <div>
      <label>Category</label>

      <select
        value={budgetCategory}
        onChange={(e) => setBudgetCategory(e.target.value)}
      >
        <option>Food</option>
        <option>Entertainment</option>
        <option>Travel</option>
        <option>Shopping</option>
        <option>Education</option>
        <option>Other</option>
      </select>
    </div>

    <div>
      <label>Budget Limit</label>

      <input
        type="number"
        placeholder="Enter budget limit"
        value={budgetLimit}
        onChange={(e) => setBudgetLimit(e.target.value)}
      />
    </div>

    <button type="submit">
      Save Budget
    </button>

  </form>

</div>
      {budgets.map((budget) => (
  <section className="transactions" key={budget.id}>
    <h2>{budget.category}</h2>

    <p>Budget Limit: ₹{budget.limit}</p>

    <p>
      Spent: ₹
      {transactions
        .filter(
          (transaction) =>
            transaction.category === budget.category &&
            transaction.amount < 0
        )
        .reduce(
          (total, transaction) =>
            total + Math.abs(transaction.amount),
          0
        )}
    </p>
  </section>
))}
    </>
)}
        {activePage === 'Insights' && (
          <>
            <h1>Insights</h1>
            <div className="page-box">

  <h2>Financial Summary</h2>

  <p>Total Income: ₹{income}</p>

  <p>Total Expenses: ₹{expenses}</p>

  <p>Current Balance: ₹{balance}</p>

  <h3>Spending by Category</h3>

  {['Food', 'Entertainment', 'Travel', 'Shopping', 'Education', 'Other'].map(
    (category) => {
      const categorySpent = transactions
        .filter(
          (transaction) =>
            transaction.category === category &&
            transaction.amount < 0
        )
        .reduce(
          (total, transaction) =>
            total + Math.abs(transaction.amount),
          0
        )

      return (
        <p key={category}>
          {category}: ₹{categorySpent}
        </p>
      )
    }
  )}

</div>
            </>
        )}

      </main>
    </div>
  )
}

export default App