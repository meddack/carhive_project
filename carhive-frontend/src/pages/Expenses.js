import axios from "axios";
import React, { useEffect, useState } from "react";

function Expenses() {
  const [form, setForm] = useState({ carId: "", type: "fuel", amount: 0, user: "", date: "" });
  const [expenses, setExpenses] = useState([]);
  const [cars, setCars] = useState([]);

  const fetchCars = async () => {
    const res = await axios.get("http://localhost:5000/api/cars/all");
    setCars(res.data);
  };

  const fetchExpenses = async () => {
    const res = await axios.get("http://localhost:5000/api/expenses/all");
    setExpenses(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/expenses/add", form);
    fetchExpenses();
  };

  useEffect(() => {
    fetchCars();
    fetchExpenses();
  }, []);

  return (
    <div>
      <h2>Log an Expense</h2>
      <form onSubmit={handleSubmit}>
        <select required onChange={(e) => setForm({ ...form, carId: e.target.value })}>
          <option value="">Select Car</option>
          {cars.map((car) => (
            <option key={car._id} value={car._id}>{car.name}</option>
          ))}
        </select>
        <select onChange={(e) => setForm({ ...form, type: e.target.value })}>
          <option value="fuel">Fuel</option>
          <option value="maintenance">Maintenance</option>
          <option value="accident">Accident</option>
        </select>
        <input type="number" placeholder="Amount" onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
        <input type="text" placeholder="User Name" onChange={(e) => setForm({ ...form, user: e.target.value })} required />
        <input type="date" onChange={(e) => setForm({ ...form, date: e.target.value })} required />
        <button type="submit">Submit</button>
      </form>

      <h3>All Expenses</h3>
      <ul>
        {expenses.map((e, idx) => (
          <li key={idx}>{e.date} - {e.user} - {e.type}: ₹{e.amount}</li>
        ))}
      </ul>
    </div>
  );
}

export default Expenses;
