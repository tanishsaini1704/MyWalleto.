import { Link } from 'react-router-dom'
import SummaryCards from '../components/SummaryCards'
import TransactionForm from '../components/TransactionForm'
import ExpensePieChart from '../components/ExpensePieChart'
import BudgetProgress from '../components/BudgetProgress'
import ThemeToggle from '../components/ThemeToggle'
import { useTransactions } from '../context/TransactionContext'

const Dashboard = () => {
  const { totals, recentTransactions } = useTransactions()

  return (
    <main className="app-shell">
      <section className="tracker-card">
        <header className="tracker-header">
          <div>
            <p className="eyebrow">Wealth OS</p>
            <h1>Track Every Rupee,</h1>
              <h1>Control Every Expense.</h1>
            <p className="subheading">A premium control center for income, spending, and future-ready savings.</p>
          </div>
          <div className="header-actions">
            <span className="balance-pill">Balance: ₹{totals.balance.toLocaleString()}</span>
            <ThemeToggle />
          </div>
        </header>

        <div className="hero-panel">
          <div className="hero-copy">
            <h2>Track smarter, spend with clarity, and grow with confidence.</h2>
            <p className="subheading">Every transaction is designed to feel crisp, calm, and beautifully in control.</p>
            <div className="hero-actions">
              <Link className="primary-btn" to="/add-transaction">+ New transaction</Link>
              <Link className="secondary-btn" to="/transactions">View history</Link>
            </div>
            <div className="hero-metrics">
              <span className="hero-chip">+4.8% momentum</span>
              <span className="hero-chip">3 savings goals</span>
              <span className="hero-chip">AI-style insights</span>
            </div>
          </div>

          <div className="hero-balance-card">
            <div className="balance-label">● Available balance</div>
            <div className="balance-value">₹{totals.balance.toLocaleString()}</div>
            <div className="balance-meta">Up 12.4% from last month · 24h cash pulse active</div>
            <div className="balance-badge">Growth +24.2%</div>
          </div>
        </div>

        <SummaryCards />

        <div className="dashboard-grid">
          <div>
            <h2 style={{ marginBottom: '12px' }}>Quick capture</h2>
            <TransactionForm />
          </div>
          <div className="analytics-stack">
            <ExpensePieChart />
            <BudgetProgress />
          </div>
        </div>

        <div className="page-links">
          <Link to="/transactions">View all transactions</Link>
          <Link to="/settings">Update budget</Link>
        </div>

        <section className="transaction-section">
          <div className="section-header">
            <h2>Recent activity</h2>
          </div>
          <div className="recent-list">
            {recentTransactions.map((item) => (
              <div key={item.id} className="recent-item">
                <span>{item.category}</span>
                <strong>{item.type === 'income' ? '+' : '-'}₹{Number(item.amount).toLocaleString()}</strong>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}

export default Dashboard
