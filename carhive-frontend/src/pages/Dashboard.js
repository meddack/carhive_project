import axios from "axios";
import React, { useEffect, useState } from "react";

function Dashboard() {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/dashboard/summary")
      .then(res => setSummary(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="dashboard">
      <h2>Car Usage Summary</h2>
      {summary.map((car, idx) => (
        <div key={idx} className="card">
          <h3>{car.carName}</h3>
          <p><strong>Owners:</strong> {car.owners.join(", ")}</p>
          <p><strong>Total Bookings:</strong> {car.totalBookings}</p>
          <p><strong>Total Distance:</strong> {car.totalDistance} km</p>
          <p><strong>Total Expenses:</strong> ₹{car.totalExpenses}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
