import { useState } from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'
import TransactionForm from '../components/TransactionForm'
import TransactionList from '../components/TransactionList'
import { useTransactions } from '../context/TransactionContext'

const Transactions = () => {
  const { totals } = useTransactions()
  const [editingId, setEditingId] = useState(null)

  return (
    <main className="app-shell">
      <section className="tracker-card">
        <header className="tracker-header">
          <div>
            <p className="eyebrow">Transactions</p>
            <h1>Manage History</h1>
          </div>
          <div className="header-actions">
            <span className="balance-pill">Balance: ₹{totals.balance.toLocaleString()}</span>
            <ThemeToggle />
          </div>
        </header>

        <div className="page-links">
          <Link to="/">Back to dashboard</Link>
        </div>

        <div className="form-card">
          <h2>{editingId ? 'Edit Transaction' : 'Add or Edit Transaction'}</h2>
          <TransactionForm editingId={editingId} onDone={() => setEditingId(null)} />
        </div>

        <TransactionList onEdit={setEditingId} />
      </section>
    </main>
  )
}

export default Transactions
