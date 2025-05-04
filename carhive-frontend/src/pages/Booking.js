"use client"

import { useState, useEffect } from "react"

function Booking() {
  const [bookings, setBookings] = useState([])
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    carId: "",
    startDate: "",
    endDate: "",
    distance: "",
    purpose: "",
  })

  useEffect(() => {
    // Simulate fetching data from your API
    setTimeout(() => {
      const mockCars = [
        { _id: "1", name: "Tesla Model 3" },
        { _id: "2", name: "Toyota Prius" },
      ]

      const mockBookings = [
        {
          _id: "1",
          carId: "1",
          carName: "Tesla Model 3",
          startDate: "2023-05-10",
          endDate: "2023-05-12",
          distance: 120,
          purpose: "Weekend trip",
        },
        {
          _id: "2",
          carId: "2",
          carName: "Toyota Prius",
          startDate: "2023-05-15",
          endDate: "2023-05-15",
          distance: 45,
          purpose: "Shopping",
        },
      ]

      setCars(mockCars)
      setBookings(mockBookings)
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
    console.log("Submitting booking data:", formData)
    alert("Booking added successfully (simulated)")

    // Reset form
    setFormData({
      carId: "",
      startDate: "",
      endDate: "",
      distance: "",
      purpose: "",
    })
  }

  if (loading) {
    return <div className="text-center mt-4">Loading bookings...</div>
  }

  return (
    <div>
      <h1 className="text-center mb-4">Car Bookings</h1>

      <h2>Recent Bookings</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Car</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Distance</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.carName}</td>
                <td>{booking.startDate}</td>
                <td>{booking.endDate}</td>
                <td>{booking.distance} km</td>
                <td>{booking.purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-4">Add New Booking</h2>
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
            <label className="form-label">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Distance (km)</label>
            <input
              type="number"
              name="distance"
              value={formData.distance}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Purpose</label>
            <textarea
              name="purpose"
              value={formData.purpose}
              onChange={handleInputChange}
              className="form-control"
              rows="3"
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-success btn-block">
            Book Car
          </button>
        </form>
      </div>
    </div>
  )
}

export default Booking
