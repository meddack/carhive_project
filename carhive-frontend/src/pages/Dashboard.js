"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function Dashboard({ user }) {
  const [summaryData, setSummaryData] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalCars: 0,
    totalBookings: 0,
    totalExpenses: 0,
    availableTokens: 0
  })

  useEffect(() => {
    // Fetch dashboard data
    const fetchData = async () => {
      try {
        // In a real app, you would make an API call to your backend
        // const response = await axios.get("http://localhost:5000/api/dashboard/summary")
        
        // Simulate API call
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
                { name: "John Doe", contribution: 25 },
                { name: "Mike Johnson", contribution: 30 },
                { name: "Sarah Williams", contribution: 45 },
              ],
            },
            {
              carName: "BMW i3",
              totalBookings: 5,
              totalDistance: 210,
              totalExpenses: 150,
              owners: [
                { name: "John Doe", contribution: 20 },
                { name: "Robert Brown", contribution: 80 },
              ],
            },
            {
              carName: "Honda Civic",
              totalBookings: 7,
              totalDistance: 280,
              totalExpenses: 120,
              owners: [
                { name: "John Doe", contribution: 15 },
                { name: "Jane Smith", contribution: 35 },
                { name: "Mike Johnson", contribution: 50 },
              ],
            },
          ]
          
          setSummaryData(mockData)
          
          // Calculate stats
          const totalCars = mockData.length
          const totalBookings = mockData.reduce((sum, car) => sum + car.totalBookings, 0)
          const totalExpenses = mockData.reduce((sum, car) => sum + car.totalExpenses, 0)
          const availableTokens = 24 // Mock value
          
          setStats({
            totalCars,
            totalBookings,
            totalExpenses,
            availableTokens
          })
          
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Get user's cars and ownership percentages
  const userCars = summaryData.map(car => {
    const userOwnership = car.owners.find(owner => owner.name === user?.name)
    return {
      name: car.name,
      percentage: userOwnership ? userOwnership.contribution : 0
    }
  }).filter(car => car.percentage > 0)

  // Mock chart data
  const chartData = [
    { month: "Jan", bookings: 5, expenses: 120 },
    { month: "Feb", bookings: 8, expenses: 180 },
    { month: "Mar", bookings: 12, expenses: 220 },
    { month: "Apr", bookings: 10, expenses: 190 },
    { month: "May", bookings: 15, expenses: 280 },
    { month: "Jun", bookings: 18, expenses: 320 },
  ]

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="fade-in">
      <div className="dashboard-header">
        <div className="welcome-message">
          <h1>Welcome, {user?.name?.split(" ")[0] || "User"}!</h1>
          <p>Here's an overview of your car sharing activity</p>
        </div>
        <div className="dashboard-actions">
          <Link to="/bookings" className="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Book a Car
          </Link>
        </div>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
                <circle cx="7" cy="17" r="2"></circle>
                <circle cx="17" cy="17" r="2"></circle>
              </svg>
            </div>
          </div>
          <div className="stat-value">{stats.totalCars}</div>
          <div className="stat-label">Cars Owned</div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
          </div>
          <div className="stat-value">{stats.totalBookings}</div>
          <div className="stat-label">Total Bookings</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21V7a2 2 0 0 0-2-2h-6l-2-2H6a2 2 0 0 0-2 2v14"></path>
                <path d="M16 21v-4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4"></path>
              </svg>
            </div>
          </div>
          <div className="stat-value">${stats.totalExpenses}</div>
          <div className="stat-label">Total Expenses</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 6v6l4 2"></path>
              </svg>
            </div>
          </div>
          <div className="stat-value">{stats.availableTokens}</div>
          <div className="stat-label">Available Tokens</div>
        </div>
      </div>

      <div className="user-car-section">
        <h2>Your Car Ownership</h2>
        {userCars.length > 0 ? (
          <ul className="ownership-list">
            {userCars.map((car, index) => (
              <li key={index}>
                <strong>{car.name}</strong>: {car.percentage}%
              </li>
            ))}
          </ul>
        ) : (
          <p>You are not currently a co-owner of any car.</p>
        )}
      </div>

      {/* Placeholder for future chart/visuals */}
      <div className="chart-placeholder">
        <h2>Monthly Activity (Coming Soon)</h2>
        {/* Replace with chart component like Recharts or Chart.js */}
        <p>Bookings and expenses trends will be displayed here.</p>
      </div>
    </div>
  )
}

export default Dashboard
