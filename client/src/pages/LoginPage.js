import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 401) {
        const data = await response.json();
        setError(data.message);
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response:", data);

      if (data.isAdmin) {
        setMessage(`Welcome, Admin ${data.username}!`);
      } else {
        setMessage(`Welcome, ${data.username}!`);
      }

      localStorage.setItem("username", data.username);
      localStorage.setItem("isAdmin", data.isAdmin);

      navigate("/");

      setTimeout(() => {
        setMessage("");
      }, 10000);
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred during login.");
    }
  };

  return (
    <div>
      <Header />
      <div className="mx-auto max-w-md border rounded-lg p-8 mt-10 border-gray-400">
        <h1 className="text-2xl mb-5 text-center font-bold">Sign In</h1>
        {message && (
          <div className="mb-4 text-center text-green-600">{message}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="username">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Sign In
            </button>
          </div>
        </form>
        {error && <div className="mt-4 text-center text-red-600">{error}</div>}
      </div>
    </div>
  );
};

export default LoginPage;
