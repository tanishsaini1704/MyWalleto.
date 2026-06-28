import { useState } from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'
import { useTransactions } from '../context/TransactionContext'

const Settings = () => {
  const { budget, setBudget } = useTransactions()
  const [inputValue, setInputValue] = useState(budget)

  const handleSave = () => {
    const nextBudget = Number(inputValue)
    if (!Number.isNaN(nextBudget) && nextBudget >= 0) {
      setBudget(nextBudget)
    }
  }

  return (
    <main className="app-shell">
      <section className="tracker-card">
        <header className="tracker-header">
          <div>
            <p className="eyebrow">Settings</p>
            <h1>Budget & Preferences</h1>
          </div>
          <ThemeToggle />
        </header>

        <div className="page-links">
          <Link to="/">Back to dashboard</Link>
          <Link to="/transactions">View transactions</Link>
        </div>

        <div className="settings-card">
          <label className="budget-settings">
            Monthly budget
            <input type="number" min="0" value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
          </label>
          <button type="button" onClick={handleSave}>Save budget</button>
        </div>
      </section>
    </main>
  )
}

export default Settings
