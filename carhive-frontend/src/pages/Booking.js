import axios from "axios";
import React, { useEffect, useState } from "react";

function Booking() {
  const [form, setForm] = useState({ carId: "", user: "", date: "", startTime: "", endTime: "", distance: 0 });
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);

  const fetchCars = async () => {
    const res = await axios.get("http://localhost:5000/api/cars/all");
    setCars(res.data);
  };

  const fetchBookings = async () => {
    const res = await axios.get("http://localhost:5000/api/bookings/all");
    setBookings(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/bookings/add", form);
    fetchBookings();
  };

  useEffect(() => {
    fetchCars();
    fetchBookings();
  }, []);

  return (
    <div>
      <h2>Book the Car</h2>
      <form onSubmit={handleSubmit}>
        <select required onChange={(e) => setForm({ ...form, carId: e.target.value })}>
          <option value="">Select Car</option>
          {cars.map((car) => (
            <option key={car._id} value={car._id}>{car.name}</option>
          ))}
        </select>
        <input type="text" placeholder="User Name" onChange={(e) => setForm({ ...form, user: e.target.value })} required />
        <input type="date" onChange={(e) => setForm({ ...form, date: e.target.value })} required />
        <input type="time" onChange={(e) => setForm({ ...form, startTime: e.target.value })} required />
        <input type="time" onChange={(e) => setForm({ ...form, endTime: e.target.value })} required />
        <input type="number" placeholder="Distance (km)" onChange={(e) => setForm({ ...form, distance: e.target.value })} required />
        <button type="submit">Submit</button>
      </form>

      <h3>All Bookings</h3>
      <ul>
        {bookings.map((b, idx) => (
          <li key={idx}>{b.date} - {b.user} ({b.startTime} to {b.endTime}) - {b.distance} km</li>
        ))}
      </ul>
    </div>
  );
}

export default Booking;
