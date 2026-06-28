const TRANSACTION_KEY = 'transactions'
const BUDGET_KEY = 'budget'
const THEME_KEY = 'theme'

const defaultTransactions = [
  {
    id: 1,
    amount: 3000,
    type: 'income',
    category: 'Salary',
    description: 'Monthly salary',
    date: '2026-06-01'
  },
  {
    id: 2,
    amount: 45,
    type: 'expense',
    category: 'Food',
    description: 'Lunch with team',
    date: '2026-06-02'
  },
  {
    id: 3,
    amount: 800,
    type: 'expense',
    category: 'Bills',
    description: 'Electricity bill',
    date: '2026-06-04'
  }
]

export const loadTransactions = () => {
  if (typeof window === 'undefined') return defaultTransactions

  try {
    const saved = window.localStorage.getItem(TRANSACTION_KEY)
    return saved ? JSON.parse(saved) : defaultTransactions
  } catch {
    return defaultTransactions
  }
}

export const saveTransactions = (transactions) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(TRANSACTION_KEY, JSON.stringify(transactions))
}

export const loadBudget = () => {
  if (typeof window === 'undefined') return 10000

  try {
    const saved = window.localStorage.getItem(BUDGET_KEY)
    return saved ? Number(saved) : 10000
  } catch {
    return 10000
  }
}

export const saveBudget = (budget) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(BUDGET_KEY, String(budget))
}

export const loadTheme = () => {
  if (typeof window === 'undefined') return 'dark'

  try {
    return window.localStorage.getItem(THEME_KEY) || 'dark'
  } catch {
    return 'dark'
  }
}

export const saveTheme = (theme) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(THEME_KEY, theme)
}
