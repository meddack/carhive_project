import { Link, Route, BrowserRouter as Router, Routes, NavLink } from "react-router-dom"
import "./App.css"
import Booking from "./pages/Booking"
import Expenses from "./pages/Expenses"
import Home from "./pages/Home"
import Cars from "./pages/Car"

function App() {
  return (
    <Router>
      <div className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            CarShare
          </Link>
          <div className="navbar-links">
            <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} end>
              Dashboard
            </NavLink>
            <NavLink to="/cars" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              Cars
            </NavLink>
            <NavLink to="/booking" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              Bookings
            </NavLink>
            <NavLink to="/expenses" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              Expenses
            </NavLink>
          </div>
        </div>
      </div>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/expenses" element={<Expenses />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
