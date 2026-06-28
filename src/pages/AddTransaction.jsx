import { Link } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'
import TransactionForm from '../components/TransactionForm'

const AddTransaction = () => {
  return (
    <main className="app-shell">
      <section className="tracker-card">
        <header className="tracker-header">
          <div>
            <p className="eyebrow">Add Transaction</p>
            <h1>Create a New Entry</h1>
          </div>
          <ThemeToggle />
        </header>

        <div className="page-links">
          <Link to="/">Back to dashboard</Link>
          <Link to="/transactions">Manage transactions</Link>
        </div>

        <div className="form-card">
          <TransactionForm />
        </div>
      </section>
    </main>
  )
}

export default AddTransaction
