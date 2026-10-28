import { expenseCategories } from '../constants/expenseCategories.js'

function ExpenseFilter({ selectedCategory, onCategoryChange }) {
  return (
    <label className="filter-field">
      <span>Filter by category</span>
      <select
        value={selectedCategory}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        <option value="All">All</option>
        {expenseCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </label>
  )
}

export default ExpenseFilter
