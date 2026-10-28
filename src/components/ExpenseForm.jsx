import { useState } from 'react'
import { expenseCategories } from '../constants/expenseCategories.js'

function ExpenseForm({ onAddExpense }) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(expenseCategories[0])
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedTitle = title.trim()
    const parsedAmount = Number(amount)

    if (!trimmedTitle) {
      setError('Enter a title for this expense.')
      return
    }

    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setError('Enter an amount greater than 0.')
      return
    }

    onAddExpense({
      title: trimmedTitle,
      amount: parsedAmount,
      category,
    })
    setTitle('')
    setAmount('')
    setCategory(expenseCategories[0])
    setError('')
  }

  return (
    <section className="form-card" aria-labelledby="form-heading">
      <div className="form-heading">
        <div>
          <p className="eyebrow">GET STARTED</p>
          <h2 id="form-heading">Add an expense</h2>
        </div>
        <span className="form-icon" aria-hidden="true">+</span>
      </div>

      <form className="expense-form" onSubmit={handleSubmit} noValidate>
        <div className="form-fields">
          <label className="form-field">
            <span>Title</span>
            <input
              type="text"
              name="title"
              placeholder="e.g. Weekly groceries"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              aria-invalid={Boolean(error && !title.trim())}
              aria-describedby={error && !title.trim() ? 'form-error' : undefined}
              autoComplete="off"
            />
          </label>

          <label className="form-field">
            <span>Amount</span>
            <input
              type="number"
              name="amount"
              placeholder="0.00"
              min="0.01"
              step="any"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              aria-invalid={Boolean(
                error && (!Number.isFinite(Number(amount)) || Number(amount) <= 0),
              )}
              aria-describedby={
                error &&
                (!Number.isFinite(Number(amount)) || Number(amount) <= 0)
                  ? 'form-error'
                  : undefined
              }
              inputMode="decimal"
            />
          </label>

          <label className="form-field">
            <span>Category</span>
            <select
              name="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {expenseCategories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="form-actions">
          <p
            className="form-error"
            id="form-error"
            role={error ? 'alert' : undefined}
            aria-live="polite"
          >
            {error}
          </p>
          <button type="submit" className="submit-button">
            Add expense <span aria-hidden="true">→</span>
          </button>
        </div>
      </form>
    </section>
  )
}

export default ExpenseForm
