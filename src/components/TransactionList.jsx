import { useState } from 'react'
import { useTransactions } from '../context/TransactionContext'

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(value)

const TransactionList = ({ onEdit }) => {
  const { transactions, deleteTransaction } = useTransactions()
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const visibleTransactions = transactions.filter((item) => {
    const matchesFilter = filter === 'all' || item.type === filter
    const matchesSearch = [item.category, item.description, item.date]
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase())

    return matchesFilter && matchesSearch
  })

  return (
    <section className="transaction-section">
      <div className="section-header">
        <h2>Transactions</h2>
        <div className="filters">
          <input
            type="search"
            placeholder="Search transactions"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <select value={filter} onChange={(event) => setFilter(event.target.value)}>
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      <div className="transaction-list">
        {visibleTransactions.length === 0 ? (
          <div className="empty-state">No transactions match your filters.</div>
        ) : (
          visibleTransactions.map((item) => (
            <article key={item.id} className="transaction-item">
              <div>
                <p className="transaction-category">{item.category}</p>
                <p className="transaction-note">{item.description}</p>
                <p className="transaction-date">{item.date}</p>
              </div>
              <div className="transaction-meta">
                <span className={item.type === 'income' ? 'amount income-text' : 'amount expense-text'}>
                  {item.type === 'income' ? '+' : '-'}{formatCurrency(Number(item.amount))}
                </span>
                <button type="button" className="edit-btn" onClick={() => onEdit(item.id)}>
                  Edit
                </button>
                <button type="button" onClick={() => deleteTransaction(item.id)}>
                  Delete
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  )
}

export default TransactionList
