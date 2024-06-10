import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faYoutube,
  faLinkedinIn,
  faTiktok,
  faWeixin,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-4">
      <div className="container mx-auto text-center text-xm">
        <div className="flex justify-center space-x-4 mb-2">
          <a href="#" className="hover:text-white">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="#" className="hover:text-white">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="#" className="hover:text-white">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="#" className="hover:text-white">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
          <a href="#" className="hover:text-white">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
          <a href="#" className="hover:text-white">
            <FontAwesomeIcon icon={faTiktok} />
          </a>
          <a href="#" className="hover:text-white">
            <FontAwesomeIcon icon={faWeixin} />
          </a>
        </div>
        <div className="flex justify-center space-x-4 mb-2">
          <a href="#" className="hover:text-white">
            Accessibility
          </a>
          <a href="#" className="hover:text-white">
            Privacy & Cookie Policy
          </a>
          <a href="#" className="hover:text-white">
            Legal Notice
          </a>
          <a href="#" className="hover:text-white">
            Passenger Rights
          </a>
          <a href="#" className="hover:text-white">
            Change Cookie Settings
          </a>
          <a href="#" className="hover:text-white">
            EU Data Subjects Rights
          </a>
        </div>
        <div className="text-gray-500">
          OGUZHAN Airlines Copyright © 1996 - 2024
        </div>
      </div>
    </footer>
  );
};

export default Footer;
