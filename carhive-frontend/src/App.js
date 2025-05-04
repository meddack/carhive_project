import React from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Booking from "./pages/Booking";
import Expenses from "./pages/Expenses";
import Home from "./pages/Home";


function App() {
  return (
    <Router>
      <nav style={{ padding: 10 }}>
        <Link to="/" style={{ marginRight: 10 }}>Home</Link>
        <Link to="/booking" style={{ marginRight: 10 }}>Booking</Link>
        <Link to="/expenses">Expenses</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/expenses" element={<Expenses />} />
      </Routes>
    </Router>
  );
}

export default App;