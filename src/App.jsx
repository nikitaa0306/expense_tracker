function ExpenseList({ expenses }) {
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
            {expenses.length} {expenses.length === 1 ? 'expense' : 'expenses'}
          </span>
          <span className="expense-total">
            Total: ${total.toFixed(2)}
          </span>
        </div>
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
                ${expense.amount.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default ExpenseList