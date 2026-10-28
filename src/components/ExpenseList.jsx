function ExpenseList({ expenses, onDeleteExpense, selectedCategory }) {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <section className="expenses-section" aria-labelledby="expenses-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">YOUR SPENDING</p>
          <h2 id="expenses-heading">Recent expenses</h2>
        </div>
        <div className="expense-summary">
          <span className="expense-count">
            Showing {expenses.length}{' '}
            {expenses.length === 1 ? 'expense' : 'expenses'}
          </span>
          <span className="expense-total">
            Total: ${total.toFixed(2)}
          </span>
        </div>
      </div>

      {expenses.length === 0 ? (
        <p className="empty-state">
          {selectedCategory === 'All'
            ? 'Your expenses will show up here.'
            : `No ${selectedCategory} expenses to show.`}
        </p>
      ) : (
        <ul className="expense-list">
          {expenses.map((expense) => (
            <li className="expense-item" key={expense.id}>
              <div className="expense-details">
                <span className="expense-title">{expense.title}</span>
                <span className="expense-category">{expense.category}</span>
              </div>
              <span className="expense-amount">
                ${expense.amount.toFixed(2)}
              </span>
              <button
                type="button"
                className="delete-expense-button"
                aria-label={`Delete ${expense.title}`}
                onClick={() => onDeleteExpense(expense.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default ExpenseList