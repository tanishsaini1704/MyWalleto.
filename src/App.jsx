import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { ThemeProvider } from './context/ThemeContext'
import { TransactionProvider } from './context/TransactionContext'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import AddTransaction from './pages/AddTransaction'
import Settings from './pages/Settings'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <TransactionProvider>
        <div className="app-wrapper">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/add-transaction" element={<AddTransaction />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </TransactionProvider>
    </ThemeProvider>
  )
}

export default App
