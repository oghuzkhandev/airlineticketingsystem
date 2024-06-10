import React, { useState } from "react";
import Header from "../components/header";
import "../index.css";

const AddFlightPage = () => {
  const [flightData, setFlightData] = useState({
    flightDate: "",
    flightCode: "",
    milesPoints: "",
    capacity: "",
    from: "",
    to: "",
    flightDuration: "",
    operatedBy: "",
    economyPrice: "",
    businessPrice: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlightData({
      ...flightData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);
    setMessage("");

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
        setFlightData({
          flightDate: "",
          flightCode: "",
          milesPoints: "",
          capacity: "",
          from: "",
          to: "",
          flightDuration: "",
          operatedBy: "",
          economyPrice: "",
          businessPrice: "",
        });
      } else {
        setIsError(true);
        setMessage(
          data.message || "An error occurred while adding the flight."
        );
      }
    } catch (error) {
      setIsError(true);
      setMessage("An error occurred while adding the flight.");
    }
  };

  return (
    <div>
      <Header />
      <div className="max-w-lg h-[1000px] mx-auto mt-10 p-6 bg-white rounded-lg shadow-2xl mt-20">
        <h2 className="text-2xl font-bold mb-6 text-center text-red-500">
          Add Flight
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Flight Date:</label>
            <input
              type="date"
              name="flightDate"
              value={flightData.flightDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Flight Code:</label>
            <input
              type="text"
              name="flightCode"
              value={flightData.flightCode}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Miles Points:</label>
            <input
              type="number"
              name="milesPoints"
              value={flightData.milesPoints}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Capacity:</label>
            <input
              type="number"
              name="capacity"
              value={flightData.capacity}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">From:</label>
            <input
              type="text"
              name="from"
              value={flightData.from}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">To:</label>
            <input
              type="text"
              name="to"
              value={flightData.to}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Flight Duration:</label>
            <input
              type="text"
              name="flightDuration"
              value={flightData.flightDuration}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Operated By:</label>
            <input
              type="text"
              name="operatedBy"
              value={flightData.operatedBy}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Economy Price:</label>
            <input
              type="number"
              name="economyPrice"
              value={flightData.economyPrice}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Business Price:</label>
            <input
              type="number"
              name="businessPrice"
              value={flightData.businessPrice}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 custom-shadow"
          >
            Save
          </button>
        </form>
        {message && (
          <div
            className={`mt-4 text-center ${
              isError ? "text-red-500" : "text-green-500"
            }`}
          >
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddFlightPage;
