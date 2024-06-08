import React, { useState } from "react";

const AddFlightPage = () => {
  const [flightData, setFlightData] = useState({
    flightDate: "",
    flightCode: "",
    milesPoints: "",
    capacity: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlightData({
      ...flightData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:4000/api/flights/add-flight",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(flightData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setMessage(`Flight ${flightData.flightCode} added successfully!`);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("An error occurred while adding the flight.");
    }
  };

  return (
    <div className="add-flight-container">
      <h2>Add Flight</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Flight Date:</label>
          <input
            type="date"
            name="flightDate"
            value={flightData.flightDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Flight Code:</label>
          <input
            type="text"
            name="flightCode"
            value={flightData.flightCode}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Miles Points:</label>
          <input
            type="number"
            name="milesPoints"
            value={flightData.milesPoints}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Capacity:</label>
          <input
            type="number"
            name="capacity"
            value={flightData.capacity}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddFlightPage;
