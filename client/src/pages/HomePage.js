import React from "react";
import Header from "../components/header";
import MainPage from "../components/content";
import Footer from "../components/footer";
import "../styles/home.css";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <MainPage />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
