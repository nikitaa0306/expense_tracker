import { useRef, useState } from 'react'
import ExpenseFilter from './components/ExpenseFilter.jsx'
import ExpenseForm from './components/ExpenseForm.jsx'
import ExpenseList from './components/ExpenseList.jsx'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const nextExpenseId = useRef(0)

  function addExpense(expense) {
    const newExpense = { ...expense, id: nextExpenseId.current }
    nextExpenseId.current += 1
    setExpenses((currentExpenses) => [...currentExpenses, newExpense])
  }

  function deleteExpense(expenseId) {
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== expenseId),
    )
  }

  const displayedExpenses =
    selectedCategory === 'All'
      ? expenses
      : expenses.filter((expense) => expense.category === selectedCategory)

  return (
    <main className="app">
      <header className="app-header">
        <p className="eyebrow">PERSONAL FINANCE</p>
        <h1>Expense tracker</h1>
        <p className="app-description">
          Keep track of where your money goes.
        </p>
      </header>

      <ExpenseForm onAddExpense={addExpense} />
      <ExpenseFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <ExpenseList
        expenses={displayedExpenses}
        onDeleteExpense={deleteExpense}
        selectedCategory={selectedCategory}
      />
    </main>
  )
}

export default App
