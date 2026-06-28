import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { loadBudget, loadTransactions, saveBudget, saveTransactions } from '../services/localStorageService'

const TransactionContext = createContext(null)

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(loadTransactions)
  const [budget, setBudget] = useState(loadBudget)

  useEffect(() => {
    saveTransactions(transactions)
  }, [transactions])

  useEffect(() => {
    saveBudget(budget)
  }, [budget])

  const addTransaction = (transaction) => {
    setTransactions((prev) => [{ ...transaction, id: Date.now() }, ...prev])
  }

  const updateTransaction = (id, updates) => {
    setTransactions((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)))
  }

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((item) => item.id !== id))
  }

  const totals = useMemo(() => {
    const income = transactions
      .filter((item) => item.type === 'income')
      .reduce((sum, item) => sum + Number(item.amount), 0)

    const expense = transactions
      .filter((item) => item.type === 'expense')
      .reduce((sum, item) => sum + Number(item.amount), 0)

    return {
      income,
      expense,
      balance: income - expense,
      transactionCount: transactions.length,
      savings: income - expense
    }
  }, [transactions])

  const recentTransactions = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5)
  }, [transactions])

  const value = useMemo(
    () => ({
      transactions,
      budget,
      setBudget,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      totals,
      recentTransactions
    }),
    [transactions, budget, totals, recentTransactions]
  )

  return <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>
}

export const useTransactions = () => useContext(TransactionContext)
