import React, { useState, useEffect } from "react";
import logo from "../images/OguzhanAirline.png";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faSuitcaseRolling,
  faTag,
  faPlane,
  faUserShield,
  faQuestionCircle,
  faHandsClapping,
  faFaceSmileBeam,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/header.css";

const Header = () => {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isDealsModalOpen, setIsDealsModalOpen] = useState(false);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMilesMember, setIsMilesMember] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    const milesMemberStatus = localStorage.getItem("isMilesMember") === "true";
    const storedUsername = localStorage.getItem("username");
    setIsAdmin(adminStatus);
    setIsMilesMember(milesMemberStatus);
    setUsername(storedUsername);
    setIsLoggedIn(!!storedUsername);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isMilesMember");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setIsAdmin(false);
    setIsMilesMember(false);
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
              <span className="font-bold text-[22px]">OGUZHAN AIRLINES</span>
            </Link>
          </div>
          <nav className="flex-grow flex justify-end items-center gap-4 text-[12px] font-bold tracking-tighter">
            {username && (
              <div className="bg-transparent text-xs font-bold text-green-500 p-2 text-center">
                Welcome, {isAdmin ? `Admin ${username}` : `${username}`}!{" "}
                <FontAwesomeIcon className="text-sm" icon={faHandsClapping} />
                {isMilesMember && (
                  <div className="mt-2">
                    You are a Miles&Smiles member.{" "}
                    <FontAwesomeIcon
                      className="text-sm"
                      icon={faFaceSmileBeam}
                    />
                  </div>
                )}
              </div>
            )}
            <div className="nav-item">
              <Link
                to="#"
                className="flex items-center px-2 hover:border-b-2 hover:border-b-red-500 hover:bg-gray-900 h-[70px]"
              >
                <FontAwesomeIcon icon={faBook} className="mr-1" /> BOOK&MANAGE
              </Link>

              <div className="dropdown-menu">
                <div className="flex justify-around">
                  <div>
                    <h3 className="text-white">BOOK</h3>
                    <ul>
                      <li>
                        <a href="#">Book a flight</a>
                      </li>
                      <li>
                        <a href="#">Mobile app</a>
                      </li>
                      <li>
                        <a href="#">Hold the price</a>
                      </li>
                      <li>
                        <a href="#">TK Wallet</a>
                      </li>
                      <li>
                        <a href="#">Oguzhan Airlines Holidays</a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-white">MANAGE</h3>
                    <ul>
                      <li>
                        <a href="#">Manage booking</a>
                      </li>
                      <li>
                        <a href="#">Check-in</a>
                      </li>
                      <li>
                        <a href="#">Flight status</a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-white">ADDITIONAL SERVICES</h3>
                    <ul>
                      <li>
                        <a href="#">Seat selection</a>
                      </li>
                      <li>
                        <a href="#">Extra baggage</a>
                      </li>
                      <li>
                        <a href="#">Traveling with pets</a>
                      </li>
                      <li>
                        <a href="#">Business Upgrade</a>
                      </li>
                      <li>
                        <a href="#">Sports equipment</a>
                      </li>
                      <li>
                        <a href="#">Rent a car</a>
                      </li>
                      <li>
                        <a href="#">Book a hotel</a>
                      </li>
                      <li>
                        <a href="#">Travel insurance</a>
                      </li>
                      <li>
                        <a href="#">UAE E-Visa</a>
                      </li>
                      <li>
                        <a href="#">See all</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="nav-item">
              <Link
                to="#"
                onClick={openExperienceModal}
                className="flex items-center px-2 hover:border-b-2 hover:border-b-red-500 hover:bg-gray-900 h-[70px]"
              >
                <FontAwesomeIcon icon={faSuitcaseRolling} className="mr-1" />{" "}
                EXPERIENCE
              </Link>
              <div className="dropdown-menu">
                <div className="flex justify-around">
                  <div>
                    <h3 className="text-white">CABIN CLASSES</h3>
                    <ul>
                      <li>
                        <a href="#">Business Class</a>
                      </li>
                      <li>
                        <a href="#">Economy Class</a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-white">EXPERIENCE</h3>
                    <ul>
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
                    <h3 className="text-white">MORE</h3>
                    <ul>
                      <li>
                        <a href="#">Oguzhan Airlines Lounge</a>
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
              </div>
            </div>
            <div className="nav-item">
              <button
                onClick={openDealsModal}
                className="flex items-center px-2 hover:border-b-2 hover:border-b-red-500 hover:bg-gray-900 h-[70px]"
              >
                <FontAwesomeIcon icon={faTag} className="mr-1" />{" "}
                DEALS&DESTINATIONS
              </button>
              <div className="dropdown-menu">
                <div className="flex justify-around">
                  <div>
                    <h3 className="text-white">OFFERS</h3>
                    <ul>
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
                    <h3 className="text-white">DESTINATIONS</h3>
                    <ul>
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
                    <h3 className="text-white">DISCOVER</h3>
                    <ul>
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
              </div>
            </div>
            <Link
              to="/miles-and-smiles"
              className="flex items-center px-2 hover:border-b-2 hover:border-b-red-500 hover:bg-gray-900 h-[70px]"
            >
              <FontAwesomeIcon icon={faPlane} className="mr-1" /> MILES&SMILES
            </Link>
            <div className="nav-item">
              <button
                onClick={openHelpModal}
                className="flex items-center px-2 hover:border-b-2 hover:border-b-red-500 hover:bg-gray-900 h-[70px]"
              >
                <FontAwesomeIcon icon={faQuestionCircle} className="mr-1" />{" "}
                HELP
              </button>
              <div className="dropdown-menu2">
                <div className="flex justify-around">
                  <div>
                    <h3 className="text-white">TRAVEL INFO</h3>
                    <ul>
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
                    <h3 className="text-white">FAQ</h3>
                    <ul>
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
                    <h3 className="text-white">HELP CENTER</h3>
                    <ul>
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
              </div>
            </div>
            {!isLoggedIn ? (
              <>
                <Link
                  to="/usersignup"
                  className="flex items-center px-2 hover:border-b-2 hover:border-b-red-500 hover:bg-gray-900 h-[70px] font-thin"
                >
                  SIGN UP
                </Link>
                <Link
                  to="/login"
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
                <FontAwesomeIcon icon={faUserShield} className="mr-1" /> LOGOUT
              </button>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
