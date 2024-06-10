import React, { useState } from "react";
import Header from "../components/header";

const MSsignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    dateOfBirth: "",
    country: "",
    city: "",
    gender: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const generateMilesMemberNumber = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const milesMemberData = {
      ...formData,
      isMilesMember: true,
      milesMemberNumber: generateMilesMemberNumber(),
    };

    try {
      const response = await fetch("http://localhost:4000/api/miles-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(milesMemberData),
      });

      if (response.ok) {
        console.log("Miles&Smiles member registered successfully");
        setSuccessMessage("Miles&Smiles member registered successfully.");
        setFormData({
          firstName: "",
          lastName: "",
          username: "",
          password: "",
          email: "",
          dateOfBirth: "",
          country: "",
          city: "",
          gender: "",
        });
      } else {
        const errorData = await response.json();
        console.error("Failed to register:", errorData.message);
        setErrorMessage(errorData.message || "Failed to register.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Error occurred during registration.");
    }
  };

  return (
    <div>
      <Header />
      <h1 className="text-2xl mb-5 text-center font-bold text-red-600 mt-10">
        Miles & Smiles Membership Enrollment Details
      </h1>
      <div className="mx-auto max-w-xl border rounded-lg p-8 mt-10 border-gray-400">
        <form onSubmit={handleSubmit} className="py-5">
          <div className="mb-4 flex flex-col mx-auto w-[450px]">
            <label className="block text-gray-700" htmlFor="firstName">
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4 flex flex-col mx-auto w-[450px]">
            <label className="block text-gray-700" htmlFor="lastName">
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4 flex flex-col mx-auto w-[450px]">
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
          <div className="mb-4 flex flex-col mx-auto w-[450px]">
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
          <div className="mb-4 flex flex-col mx-auto w-[450px]">
            <label className="block text-gray-700" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4 flex flex-col mx-auto w-[450px]">
            <label className="block text-gray-700" htmlFor="dateOfBirth">
              Date of Birth:
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4 flex flex-col mx-auto w-[450px]">
            <label className="block text-gray-700" htmlFor="country">
              Country:
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4 flex flex-col mx-auto w-[450px]">
            <label className="block text-gray-700" htmlFor="city">
              City:
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4 flex flex-col mx-auto w-[450px]">
            <label className="block text-gray-700" htmlFor="gender">
              Gender:
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-purple-800 mt-5 text-white py-2 px-3 rounded-md custom-shadow hover:custom-shadow button:active"
            >
              Create your Miles&Smiles Account
            </button>
          </div>
        </form>
        {successMessage && (
          <div className="mt-4 text-green-600 text-center">
            <svg
              className="w-6 h-6 inline-block mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mt-4 text-red-600 text-center">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default MSsignupPage;
