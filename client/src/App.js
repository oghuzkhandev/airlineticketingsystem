import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import "./index.css";
import "animate.css";
import MilesAndSmilesPage from "./pages/Miles&SmilesPage";
import MSsignupPage from "./pages/MSsignupPage";
import LoginPage from "./pages/LoginPage";
import AddFlightPage from "./pages/AddFlightPage";
import SearchFlightsPage from "./pages/SearchFlightsPage";
import Authentication from "./components/Authentication";

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
            <Route path="/add-flight" element={<AddFlightPage />} />
            <Route path="/search-flights" element={<SearchFlightsPage />} />
            <Route path="/protected" element={<Authentication />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
