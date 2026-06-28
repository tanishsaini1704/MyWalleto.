import { useTransactions } from '../context/TransactionContext'

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(value)

const SummaryCards = () => {
  const { totals } = useTransactions()

  return (
    <div className="summary-grid">
      <article className="summary-card income">
        <div className="card-icon">↗</div>
        <span>Total Income</span>
        <strong>{formatCurrency(totals.income)}</strong>
      </article>
      <article className="summary-card expense">
        <div className="card-icon">↘</div>
        <span>Total Expenses</span>
        <strong>{formatCurrency(totals.expense)}</strong>
      </article>
      <article className="summary-card balance">
        <div className="card-icon">◌</div>
        <span>Net Balance</span>
        <strong>{formatCurrency(totals.balance)}</strong>
      </article>
    </div>
  )
}

export default SummaryCards
