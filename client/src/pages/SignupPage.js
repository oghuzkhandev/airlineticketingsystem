import React, { useState } from "react";
import Header from "../components/header";

function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const [isEmailTaken, setIsEmailTaken] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError("");
    setIsUsernameTaken(false);
    setIsEmailTaken(false);

    try {
      const response = await fetch("http://localhost:4000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 400) {
        const data = await response.json();
        setError(data.message);
        if (data.message === "Username is already taken.") {
          setIsUsernameTaken(true);
        } else if (data.message === "Email is already registered.") {
          setIsEmailTaken(true);
        }
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response:", data);
      setSuccess(true);
      setFormData({
        username: "",
        password: "",
        email: "",
      });
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred during sign up.");
    }
  };

  return (
    <div>
      <Header />
      <div className="mx-auto max-w-xl border rounded-lg p-8 mt-10 border-gray-400">
        <h1 className="text-2xl mb-5 text-center font-bold underline underline-offset-8">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="py-5">
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
              className={`w-full px-3 py-2 border rounded ${
                isUsernameTaken ? "border-red-500" : "border-gray-300"
              }`}
            />
            {isUsernameTaken && (
              <span className="text-red-500 text-sm mt-1">
                This username is already taken.
              </span>
            )}
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
              className={`w-full px-3 py-2 border rounded ${
                isEmailTaken ? "border-red-500" : "border-gray-300"
              }`}
            />
            {isEmailTaken && (
              <span className="text-red-500 text-sm mt-1">
                This email is already registered.
              </span>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-purple-800 mt-5 text-white py-2 px-3 rounded-md custom-shadow custom-shadow:hover button:active"
            >
              Create your Account
            </button>
          </div>
        </form>
        {success && (
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
            Account created successfully.
          </div>
        )}
        {error && !isUsernameTaken && !isEmailTaken && (
          <div className="mt-4 text-red-600 text-center">{error}</div>
        )}
      </div>
    </div>
  );
}

export default SignupPage;
