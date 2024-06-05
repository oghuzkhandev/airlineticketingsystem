import React from "react";
import logo from "../images/OguzhanAirline.png";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white h-[70px] w-full">
      <div className="flex items-center px-4">
        <div className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Oguzhan Airline Logo"
            className="h-[60px] w-[100px] object-cover"
          />
          <span className="font-bold text-[18px]">OGUZHAN AIRLINES</span>
        </div>
        <nav className="flex-grow flex justify-end items-center gap-4 text-[13px] font-bold tracking-tighter">
          <a
            href="#"
            className="flex items-center px-2 hover:border-b-2 hover:border-b-red-500 hover:bg-gray-900 h-[70px]"
          >
            BİLET AL VE YÖNET
          </a>
          <a
            href="#"
            className="flex items-center px-2 hover:border-b-2 hover:border-b-red-500 hover:bg-gray-900 h-[70px]"
          >
            SEYAHAT DENEYİMİ
          </a>
          <a
            href="#"
            className="flex items-center px-2 hover:border-b-2 hover:border-b-red-500 hover:bg-gray-900 h-[70px]"
          >
            FIRSATLAR VE UÇUŞ NOKTALARI
          </a>
          <a
            href="#"
            className="flex items-center px-2 hover:border-b-2 hover:border-b-red-500 hover:bg-gray-900 h-[70px]"
          >
            MILES&SMILES
          </a>
          <a
            href="#"
            className="flex items-center px-2 hover:border-b-2 hover:border-b-red-500 hover:bg-gray-900 h-[70px]"
          >
            YARDIM
          </a>
          <a
            href="#"
            className="flex items-center px-2 hover:border-b-2 hover:border-b-red-500 hover:bg-gray-900 h-[70px] font-thin"
          >
            ÜYE OL
          </a>
          <button className="bg-transparent flex items-center text-white border border-white px-4 py-2 rounded-full hover:bg-white hover:text-gray-800 transition">
            GIRIS YAP
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
