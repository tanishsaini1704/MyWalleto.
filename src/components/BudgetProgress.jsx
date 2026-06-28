import { useTransactions } from '../context/TransactionContext'

const BudgetProgress = () => {
  const { budget, setBudget, totals } = useTransactions()
  const spent = totals.expense
  const percentUsed = budget ? Math.min((spent / budget) * 100, 100) : 0

  let status = 'Safe'
  if (percentUsed >= 100) status = 'Danger'
  else if (percentUsed >= 80) status = 'Warning'

  return (
    <div className="analytics-card">
      <h3>Budget Tracking</h3>
      <div className="budget-input-row">
        <label>
          Monthly Budget
          <input
            type="number"
            min="0"
            value={budget}
            onChange={(event) => setBudget(Number(event.target.value) || 0)}
          />
        </label>
      </div>
      <div className="progress-bar">
        <div className={`progress-fill ${status.toLowerCase()}`} style={{ width: `${percentUsed}%` }} />
      </div>
      <p className="budget-summary">
        ₹{spent.toLocaleString()} of ₹{budget.toLocaleString()} used ({Math.round(percentUsed)}%)
      </p>
      <p className={`budget-status ${status.toLowerCase()}`}>Status: {status}</p>
    </div>
  )
}

export default BudgetProgress
