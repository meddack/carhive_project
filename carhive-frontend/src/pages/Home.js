import axios from "axios";
import React, { useEffect, useState } from "react";

function Home() {
  const [form, setForm] = useState({ name: "", owners: "" });
  const [cars, setCars] = useState([]);

  const fetchCars = async () => {
    const res = await axios.get("http://localhost:5000/api/cars/all");
    setCars(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const car = { ...form, owners: form.owners.split(",").map(o => o.trim()) };
    await axios.post("http://localhost:5000/api/cars/add", car);
    fetchCars();
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div>
      <h1>Welcome to CarHive</h1>
      <p>Manage your shared car seamlessly with bookings, expenses, and reports.</p>

      <h2>Add a Car (Multi-Owner)</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Car Name" onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input type="text" placeholder="Owners (comma-separated)" onChange={(e) => setForm({ ...form, owners: e.target.value })} required />
        <button type="submit">Add Car</button>
      </form>

      <h3>All Cars</h3>
      <ul>
        {cars.map((car, idx) => (
          <li key={idx}>{car.name} - Owners: {car.owners.join(", ")}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
