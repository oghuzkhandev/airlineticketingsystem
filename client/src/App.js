import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import "./index.css";
import MilesAndSmilesPage from "./pages/Miles&SmilesPage";
import MSsignupPage from "./pages/MSsignupPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <Router>
      <div>
        <main className="app-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/usersignup" element={<SignupPage />} />
            <Route path="/miles-and-smiles" element={<MilesAndSmilesPage />} />
            <Route path="/signup-miles&smiles" element={<MSsignupPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
