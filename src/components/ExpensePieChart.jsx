import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { useTransactions } from '../context/TransactionContext'

ChartJS.register(ArcElement, Tooltip, Legend)

const ExpensePieChart = () => {
  const { transactions } = useTransactions()
  const expenseData = transactions.filter((item) => item.type === 'expense')

  const totalsByCategory = expenseData.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + Number(item.amount)
    return acc
  }, {})

  const labels = Object.keys(totalsByCategory)
  const values = Object.values(totalsByCategory)

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: ['#2563eb', '#0f9f5b', '#f59e0b', '#ef4444', '#8b5cf6', '#14b8a6', '#f43f5e', '#64748b']
      }
    ]
  }

  return (
    <div className="analytics-card">
      <h3>Expense Analytics</h3>
      <div className="chart-wrapper">
        {values.length ? <Pie data={data} /> : <p className="empty-state">Add some expenses to see the chart.</p>}
      </div>
    </div>
  )
}

export default ExpensePieChart
