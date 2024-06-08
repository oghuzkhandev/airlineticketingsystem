import React, { useState, useEffect } from "react";
import logo from "../images/OguzhanAirline.png";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isDealsModalOpen, setIsDealsModalOpen] = useState(false);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    const storedUsername = localStorage.getItem("username");
    setIsAdmin(adminStatus);
    setUsername(storedUsername);
    setIsLoggedIn(!!storedUsername);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("isAdmin");
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUsername("");
    navigate("/login");
  };

  const openHelpModal = () => {
    setIsHelpModalOpen(true);
  };

  const closeHelpModal = () => {
    setIsHelpModalOpen(false);
  };

  const openDealsModal = () => {
    setIsDealsModalOpen(true);
  };

  const closeDealsModal = () => {
    setIsDealsModalOpen(false);
  };

  const openExperienceModal = () => {
    setIsExperienceModalOpen(true);
  };

  const closeExperienceModal = () => {
    setIsExperienceModalOpen(false);
  };

  return (
    <>
      <header className="bg-gray-800 text-white h-[70px] w-full z-10 relative">
        <div className="flex items-center px-4">
          <div className="flex items-center space-x-2">
            <img
              src={logo}
              alt="Oguzhan Airline Logo"
              className="h-[60px] w-[100px] object-cover"
            />
            <Link to={"/"}>
              <span className="font-bold text-[18px]">OGUZHAN AIRLINES </span>
            </Link>
          </div>
          <nav className="flex-grow flex justify-end items-center gap-4 text-[12px] font-bold tracking-tighter">
            <Link
              to={"#"}
              className="flex items-center px-2 hover:border-b-2 hover:border-b-red-500 hover:bg-gray-900 h-[70px]"
            >
              BOOK&MANAGE
            </Link>
            <Link
              to={"#"}
              onClick={openExperienceModal}
              className="flex items-center px-2 hover:border-b-2 hover:border-b-red-500 hover:bg-gray-900 h-[70px]"
            >
              EXPERIENCE
            </Link>
            <button
              onClick={openDealsModal}
              className="flex items-center px-2 hover:border-b-2 hover:border-b-red-500 hover:bg-gray-900 h-[70px]"
            >
              DEALS&DESTINATIONS
            </button>
            <Link
              to={"/miles-and-smiles"}
              className="flex items-center px-2 hover:border-b-2 hover:border-b-red-500 hover:bg-gray-900 h-[70px]"
            >
              MILES&SMILES
            </Link>
            <button
              onClick={openHelpModal}
              className="flex items-center px-2 hover:border-b-2 hover:border-b-red-500 hover:bg-gray-900 h-[70px]"
            >
              HELP
            </button>
            {!isLoggedIn ? (
              <>
                <Link
                  to={"/usersignup"}
                  className="flex items-center px-2 hover:border-b-2 hover:border-b-red-500 hover:bg-gray-900 h-[70px] font-thin"
                >
                  SIGN UP
                </Link>
                <Link
                  to={"/login"}
                  className="bg-transparent flex items-center text-white border border-white px-4 py-2 rounded-full hover:bg-white hover:text-gray-800 transition"
                >
                  SIGN IN
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-transparent flex items-center text-white border border-white px-4 py-2 rounded-full hover:bg-white hover:text-gray-800 transition"
              >
                LOGOUT
              </button>
            )}
            {isAdmin && (
              <button
                onClick={() => alert("Open Add Flight Modal")}
                className="bg-green-600 text-white px-4 py-2 rounded-full ml-4"
              >
                Add Flight
              </button>
            )}
          </nav>
        </div>
        {username && (
          <div className="bg-green-100 text-green-800 p-2 text-center">
            Welcome, {isAdmin ? `Admin ${username}` : `${username}`}!
          </div>
        )}
      </header>

      {/* Help Modal */}
      {isHelpModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-3/4 h-3/5 overflow-auto">
            <div className="flex justify-between items-center mb-4"></div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <h3 className="text-xl font-bold mb-2 underline underline-offset-8">
                  TRAVEL INFO
                </h3>
                <ul className="list-disc list-inside mt-10">
                  <li>
                    <a href="#">Check-in info</a>
                  </li>
                  <li>
                    <a href="#">Baggage services</a>
                  </li>
                  <li>
                    <a href="#">Sports equipment</a>
                  </li>
                  <li>
                    <a href="#">Transfer and transit passengers</a>
                  </li>
                  <li>
                    <a href="#">Infants and children info</a>
                  </li>
                  <li>
                    <a href="#">Traveling with pets</a>
                  </li>
                  <li>
                    <a href="#">Patients and disabled passengers</a>
                  </li>
                  <li>
                    <a href="#">Codeshare partners</a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 underline underline-offset-8">
                  FAQ
                </h3>
                <ul className="list-disc list-inside mt-10">
                  <li>
                    <a href="#">Reservation and bookings</a>
                  </li>
                  <li>
                    <a href="#">Flight cancelations and change</a>
                  </li>
                  <li>
                    <a href="#">Check-in</a>
                  </li>
                  <li>
                    <a href="#">Payment</a>
                  </li>
                  <li>
                    <a href="#">Fare rules</a>
                  </li>
                  <li>
                    <a href="#">Dining onboard</a>
                  </li>
                  <li>
                    <a href="#">Infants and children</a>
                  </li>
                  <li>
                    <a href="#">Traveling with pets</a>
                  </li>
                  <li>
                    <a href="#">Transfer and transit passengers</a>
                  </li>
                  <li>
                    <a href="#">See all</a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 underline underline-offset-8">
                  HELP CENTER
                </h3>
                <ul className="list-disc list-inside mt-10">
                  <li>
                    <a href="#">Help center</a>
                  </li>
                  <li>
                    <a href="#">Feedback</a>
                  </li>
                  <li>
                    <a href="#">Get in touch</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <button
                onClick={closeHelpModal}
                className="text-white bg-red-600 px-6 py-2 rounded hover:bg-white hover:text-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deals Modal */}
      {isDealsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-3/4 h-2/4 overflow-auto">
            <div className="flex justify-between items-center mb-4"></div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <h3 className="text-xl font-bold mb-2 underline underline-offset-8">
                  OFFERS
                </h3>
                <ul className="list-disc list-inside mt-10">
                  <li>
                    <a href="#">Best flight deals</a>
                  </li>
                  <li>
                    <a href="#">Special offers</a>
                  </li>
                  <li>
                    <a href="#">Students discount</a>
                  </li>
                  <li>
                    <a href="#">Stay informed about offers</a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 underline underline-offset-8">
                  DESTINATIONS
                </h3>
                <ul className="list-disc list-inside mt-10">
                  <li>
                    <a href="#">Flight destinations</a>
                  </li>
                  <li>
                    <a href="#">Istanbul</a>
                  </li>
                  <li>
                    <a href="#">Tokyo</a>
                  </li>
                  <li>
                    <a href="#">London</a>
                  </li>
                  <li>
                    <a href="#">Paris</a>
                  </li>
                  <li>
                    <a href="#">New York</a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 underline underline-offset-8">
                  DISCOVER
                </h3>
                <ul className="list-disc list-inside mt-10">
                  <li>
                    <a href="#">Oguzhan Airlines Blog</a>
                  </li>
                  <li>
                    <a href="#">First stop: Istanbul</a>
                  </li>
                  <li>
                    <a href="#">Türkiye travel guide</a>
                  </li>
                  <li>
                    <a href="#">Trip ideas</a>
                  </li>
                  <li>
                    <a href="#">Travel tips</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex justify-end mt-10">
              <button
                onClick={closeDealsModal}
                className="text-white bg-red-600 px-6 py-2 rounded hover:bg-white hover:text-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Experience Modal */}
      {isExperienceModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-3/5 h-3/5 overflow-auto">
            <div className="flex justify-between items-center mb-4"></div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <h3 className="text-xl font-bold mb-2 underline underline-offset-8">
                  CABIN CLASSES
                </h3>
                <ul className="list-disc list-inside mt-10">
                  <li>
                    <a href="#">Business Class</a>
                  </li>
                  <li>
                    <a href="#">Economy Class</a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 underline underline-offset-8">
                  EXPERIENCE
                </h3>
                <ul className="list-disc list-inside mt-10">
                  <li>
                    <a href="#">Dining on-board</a>
                  </li>
                  <li>
                    <a href="#">Inflight entertainment</a>
                  </li>
                  <li>
                    <a href="#">Fleet</a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 underline underline-offset-8">
                  MORE
                </h3>
                <ul className="list-disc list-inside mt-10">
                  <li>
                    <a href="#">Turkish Airlines Lounge</a>
                  </li>
                  <li>
                    <a href="#">Stopover Istanbul</a>
                  </li>
                  <li>
                    <a href="#">Touristanbul</a>
                  </li>
                  <li>
                    <a href="#">Exclusive Drive</a>
                  </li>
                  <li>
                    <a href="#">PressReader</a>
                  </li>
                  <li>
                    <a href="#">Istanbul Airport</a>
                  </li>
                  <li>
                    <a href="#">See all</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex justify-end mt-20">
              <button
                onClick={closeExperienceModal}
                className="text-white bg-red-600 px-6 py-2 rounded hover:bg-white hover:text-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
