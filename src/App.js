import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import "./index.css";
import "./styles/Global.css";

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <main className="app-content">
          <Routes>
            <Route />
            <Route />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
