"use client"

import { useState, useEffect } from "react"

function Cars() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    year: "",
    licensePlate: "",
    owners: [{ name: "", contribution: 0 }],
  })

  useEffect(() => {
    // Simulate fetching data from your API
    setTimeout(() => {
      const mockCars = [
        {
          _id: "1",
          name: "Tesla Model 3",
          model: "Model 3",
          year: 2022,
          licensePlate: "ABC123",
          owners: [
            { name: "John Doe", contribution: 40 },
            { name: "Jane Smith", contribution: 60 },
          ],
        },
        {
          _id: "2",
          name: "Toyota Prius",
          model: "Prius",
          year: 2020,
          licensePlate: "XYZ789",
          owners: [
            { name: "Mike Johnson", contribution: 30 },
            { name: "Sarah Williams", contribution: 30 },
            { name: "Robert Brown", contribution: 40 },
          ],
        },
      ]
      setCars(mockCars)
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

  const handleOwnerChange = (index, field, value) => {
    const updatedOwners = [...formData.owners]
    updatedOwners[index][field] = field === "contribution" ? Number(value) : value
    setFormData({
      ...formData,
      owners: updatedOwners,
    })
  }

  const addOwnerField = () => {
    setFormData({
      ...formData,
      owners: [...formData.owners, { name: "", contribution: 0 }],
    })
  }

  const removeOwnerField = (index) => {
    const updatedOwners = [...formData.owners]
    updatedOwners.splice(index, 1)
    setFormData({
      ...formData,
      owners: updatedOwners,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would normally send the data to your backend
    console.log("Submitting car data:", formData)
    alert("Car added successfully (simulated)")

    // Reset form
    setFormData({
      name: "",
      model: "",
      year: "",
      licensePlate: "",
      owners: [{ name: "", contribution: 0 }],
    })
  }

  if (loading) {
    return <div className="text-center mt-4">Loading cars...</div>
  }

  return (
    <div>
      <h1 className="text-center mb-4">Manage Cars</h1>

      <div className="grid">
        {cars.map((car) => (
          <div className="card" key={car._id}>
            <div className="card-header">
              <h3 className="card-title">{car.name}</h3>
              <span className="badge badge-primary">{car.year}</span>
            </div>
            <div className="card-body">
              <p>
                <strong>Model:</strong> {car.model}
              </p>
              <p>
                <strong>License Plate:</strong> {car.licensePlate}
              </p>
              <p>
                <strong>Owners:</strong>
              </p>
              <ul>
                {car.owners.map((owner, index) => (
                  <li key={index}>
                    {owner.name} - {owner.contribution}%
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-4">Add New Car</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Car Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Model</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Year</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">License Plate</label>
            <input
              type="text"
              name="licensePlate"
              value={formData.licensePlate}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Owners</label>
            {formData.owners.map((owner, index) => (
              <div key={index} className="d-flex gap-2 mb-4">
                <div style={{ flex: 2 }}>
                  <input
                    type="text"
                    placeholder="Owner Name"
                    value={owner.name}
                    onChange={(e) => handleOwnerChange(index, "name", e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <input
                    type="number"
                    placeholder="Contribution %"
                    value={owner.contribution}
                    onChange={(e) => handleOwnerChange(index, "contribution", e.target.value)}
                    className="form-control"
                    min="1"
                    max="100"
                    required
                  />
                </div>
                {formData.owners.length > 1 && (
                  <button type="button" onClick={() => removeOwnerField(index)} className="btn btn-danger">
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addOwnerField} className="btn btn-primary">
              Add Owner
            </button>
          </div>

          <button type="submit" className="btn btn-success btn-block mt-4">
            Add Car
          </button>
        </form>
      </div>
    </div>
  )
}

export default Cars
