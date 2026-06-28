import { useEffect, useState } from 'react'
import { categoryOptions } from '../data/categories'
import { useTransactions } from '../context/TransactionContext'

const emptyForm = {
  type: 'expense',
  category: 'Food',
  amount: '',
  description: '',
  date: new Date().toISOString().split('T')[0]
}

const TransactionForm = ({ editingId = null, onDone }) => {
  const { transactions, addTransaction, updateTransaction } = useTransactions()
  const [formData, setFormData] = useState(emptyForm)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!editingId) {
      setFormData(emptyForm)
      return
    }

    const existing = transactions.find((item) => item.id === editingId)
    if (existing) {
      setFormData({
        type: existing.type,
        category: existing.category,
        amount: existing.amount,
        description: existing.description,
        date: existing.date
      })
    }
  }, [editingId, transactions])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const amount = Number(formData.amount)
    if (!formData.type || !formData.category || !formData.date || !formData.amount || amount <= 0) {
      setError('Please enter a valid amount and fill the required fields.')
      return
    }

    const payload = {
      type: formData.type,
      category: formData.category,
      amount,
      description: formData.description.trim() || formData.category,
      date: formData.date
    }

    if (editingId) {
      updateTransaction(editingId, payload)
    } else {
      addTransaction(payload)
    }

    setFormData(emptyForm)
    if (onDone) onDone()
  }

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      {error ? <p className="form-error">{error}</p> : null}
      <div className="form-row">
        <label>
          Type
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </label>

        <label>
          Category
          <select name="category" value={formData.category} onChange={handleChange}>
            {categoryOptions[formData.type].map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-row">
        <label>
          Amount
          <input type="number" name="amount" min="0" step="0.01" placeholder="0.00" value={formData.amount} onChange={handleChange} />
        </label>

        <label>
          Date
          <input type="date" name="date" value={formData.date} onChange={handleChange} />
        </label>
      </div>

      <label>
        Description
        <input type="text" name="description" placeholder="Add a note" value={formData.description} onChange={handleChange} />
      </label>

      <button type="submit">{editingId ? 'Save changes' : 'Add transaction'}</button>
    </form>
  )
}

export default TransactionForm
