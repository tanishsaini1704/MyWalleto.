import { NavLink } from 'react-router-dom'
import logo from '../assets/logooo.png'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="brand" aria-label="MyWalletO logo">
        <img src={logo} alt="MyWalletO logo" className="brand-logo" />
        <span><h1>MyWalletO</h1></span>
      
      </div>
      <div className="nav-links">
        <NavLink to="/" end>
          Dashboard
        </NavLink>
        <NavLink to="/transactions">Transactions</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </div>
    </nav>
  )
}

export default Navbar
