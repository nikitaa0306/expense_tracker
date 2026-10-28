import { useState } from 'react'
import ExpenseForm from './components/ExpenseForm.jsx'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState([])

  function addExpense(expense) {
    setExpenses((currentExpenses) => [...currentExpenses, expense])
  }

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

      <section className="expenses-section" aria-labelledby="expenses-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">YOUR SPENDING</p>
            <h2 id="expenses-heading">Recent expenses</h2>
          </div>
          <span className="expense-count">
            {expenses.length} {expenses.length === 1 ? 'expense' : 'expenses'}
          </span>
        </div>

        {expenses.length === 0 ? (
          <p className="empty-state">Your expenses will show up here.</p>
        ) : (
          <ul className="expense-list">
            {expenses.map((expense, index) => (
              <li className="expense-item" key={`${expense.title}-${index}`}>
                <div className="expense-details">
                  <span className="expense-title">{expense.title}</span>
                  <span className="expense-category">{expense.category}</span>
                </div>
                <span className="expense-amount">
                  {expense.amount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App
