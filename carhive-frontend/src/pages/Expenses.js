"use client"

import { useState, useEffect } from "react"

function Expenses() {
  const [expenses, setExpenses] = useState([])
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    carId: "",
    date: "",
    amount: "",
    category: "",
    description: "",
  })

  useEffect(() => {
    // Simulate fetching data from your API
    setTimeout(() => {
      const mockCars = [
        { _id: "1", name: "Tesla Model 3" },
        { _id: "2", name: "Toyota Prius" },
      ]

      const mockExpenses = [
        {
          _id: "1",
          carId: "1",
          carName: "Tesla Model 3",
          date: "2023-05-05",
          amount: 120,
          category: "Fuel",
          description: "Charging at supercharger",
        },
        {
          _id: "2",
          carId: "1",
          carName: "Tesla Model 3",
          date: "2023-05-10",
          amount: 80,
          category: "Maintenance",
          description: "Tire rotation",
        },
        {
          _id: "3",
          carId: "2",
          carName: "Toyota Prius",
          date: "2023-05-12",
          amount: 45,
          category: "Fuel",
          description: "Gas refill",
        },
      ]

      setCars(mockCars)
      setExpenses(mockExpenses)
      setLoading(false)
    }, 1000)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would normally send the data to your backend
    console.log("Submitting expense data:", formData)
    alert("Expense added successfully (simulated)")

    // Reset form
    setFormData({
      carId: "",
      date: "",
      amount: "",
      category: "",
      description: "",
    })
  }

  if (loading) {
    return <div className="text-center mt-4">Loading expenses...</div>
  }

  return (
    <div>
      <h1 className="text-center mb-4">Car Expenses</h1>

      <h2>Recent Expenses</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Car</th>
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense._id}>
                <td>{expense.carName}</td>
                <td>{expense.date}</td>
                <td>
                  <span className={`badge badge-${expense.category === "Fuel" ? "primary" : "warning"}`}>
                    {expense.category}
                  </span>
                </td>
                <td>${expense.amount}</td>
                <td>{expense.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-4">Add New Expense</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Select Car</label>
            <select name="carId" value={formData.carId} onChange={handleInputChange} className="form-select" required>
              <option value="">-- Select a car --</option>
              {cars.map((car) => (
                <option key={car._id} value={car._id}>
                  {car.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="form-select"
              required
            >
              <option value="">-- Select category --</option>
              <option value="Fuel">Fuel</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Insurance">Insurance</option>
              <option value="Parking">Parking</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Amount ($)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="form-control"
              rows="3"
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-success btn-block">
            Add Expense
          </button>
        </form>
      </div>
    </div>
  )
}

export default Expenses
