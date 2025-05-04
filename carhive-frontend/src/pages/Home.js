"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function Home() {
  const [summaryData, setSummaryData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching data from your API
    // In a real app, you would use fetch or axios to get data from your backend
    setTimeout(() => {
      const mockData = [
        {
          carName: "Tesla Model 3",
          totalBookings: 12,
          totalDistance: 450,
          totalExpenses: 320,
          owners: [
            { name: "John Doe", contribution: 40 },
            { name: "Jane Smith", contribution: 60 },
          ],
        },
        {
          carName: "Toyota Prius",
          totalBookings: 8,
          totalDistance: 320,
          totalExpenses: 180,
          owners: [
            { name: "Mike Johnson", contribution: 30 },
            { name: "Sarah Williams", contribution: 30 },
            { name: "Robert Brown", contribution: 40 },
          ],
        },
      ]
      setSummaryData(mockData)
      setLoading(false)
    }, 1000)
  }, [])

  // Calculate totals
  const totalCars = summaryData.length
  const totalBookings = summaryData.reduce((sum, car) => sum + car.totalBookings, 0)
  const totalExpenses = summaryData.reduce((sum, car) => sum + car.totalExpenses, 0)
  const totalDistance = summaryData.reduce((sum, car) => sum + car.totalDistance, 0)

  if (loading) {
    return <div className="text-center mt-4">Loading dashboard data...</div>
  }

  return (
    <div>
      <h1 className="text-center mb-4">Car Sharing Dashboard</h1>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-value">{totalCars}</div>
          <div className="stat-label">Total Cars</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalBookings}</div>
          <div className="stat-label">Total Bookings</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">${totalExpenses}</div>
          <div className="stat-label">Total Expenses</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalDistance} km</div>
          <div className="stat-label">Total Distance</div>
        </div>
      </div>

      <h2>Car Summary</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Car</th>
              <th>Owners</th>
              <th>Bookings</th>
              <th>Distance</th>
              <th>Expenses</th>
            </tr>
          </thead>
          <tbody>
            {summaryData.map((car, index) => (
              <tr key={index}>
                <td>{car.carName}</td>
                <td>
                  {car.owners.map((owner, i) => (
                    <div key={i}>
                      {owner.name} <span className="badge badge-primary">{owner.contribution}%</span>
                    </div>
                  ))}
                </td>
                <td>{car.totalBookings}</td>
                <td>{car.totalDistance} km</td>
                <td>${car.totalExpenses}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-between mt-4">
        <Link to="/cars" className="btn btn-primary">
          Manage Cars
        </Link>
        <Link to="/booking" className="btn btn-success">
          New Booking
        </Link>
        <Link to="/expenses" className="btn btn-danger">
          Record Expense
        </Link>
      </div>
    </div>
  )
}

export default Home
